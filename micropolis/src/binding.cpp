#include <napi.h>
#include "micropolis.h"

class MicropolisWrapper : public Napi::ObjectWrap<MicropolisWrapper>
{
public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  MicropolisWrapper(const Napi::CallbackInfo &info);
  Napi::FunctionReference callback;

private:
  Micropolis *_micropolis;
  static Napi::FunctionReference constructor;
  Napi::Value getVersion(const Napi::CallbackInfo &info);
  void registerCallback(const Napi::CallbackInfo &info);
  void generateSomeCity(const Napi::CallbackInfo &info);
  void simTick(const Napi::CallbackInfo &info);
  void setSpeed(const Napi::CallbackInfo &info, const Napi::Value &value);
  Napi::Value getSpeed(const Napi::CallbackInfo &info);
  Napi::Value doTool(const Napi::CallbackInfo &info);
  Napi::Value getMap(const Napi::CallbackInfo &info);
  Napi::Value getTotalFunds(const Napi::CallbackInfo &info);
  Napi::Value getPopulation(const Napi::CallbackInfo &info);
  Napi::Value getCityTime(const Napi::CallbackInfo &info);
};

MicropolisWrapper::MicropolisWrapper(const Napi::CallbackInfo &info) : Napi::ObjectWrap<MicropolisWrapper>(info)
{
  this->_micropolis = new Micropolis();
  this->_micropolis->userData = this;
}

Napi::Object MicropolisWrapper::Init(Napi::Env env, Napi::Object exports)
{
  Napi::HandleScope scope(env);

  // This method is used to hook the accessor and method callbacks
  Napi::Function func = DefineClass(env, "Micropolis", {
                                                           InstanceMethod("generateSomeCity", &MicropolisWrapper::generateSomeCity),
                                                           InstanceMethod("registerCallback", &MicropolisWrapper::registerCallback),
                                                           InstanceMethod("simTick", &MicropolisWrapper::simTick),
                                                           InstanceMethod("doTool", &MicropolisWrapper::doTool),
                                                           InstanceAccessor<&MicropolisWrapper::getSpeed, &MicropolisWrapper::setSpeed>("speed"),
                                                           InstanceAccessor<&MicropolisWrapper::getMap>("version"),
                                                           InstanceAccessor<&MicropolisWrapper::getMap>("map"),
                                                           InstanceAccessor<&MicropolisWrapper::getTotalFunds>("totalFunds"),
                                                           InstanceAccessor<&MicropolisWrapper::getPopulation>("population"),
                                                           InstanceAccessor<&MicropolisWrapper::getCityTime>("cityTime"),
                                                       });

  Napi::FunctionReference *constructor = new Napi::FunctionReference();

  // Create a persistent reference to the class constructor. This will allow
  // a function called on a class prototype and a function
  // called on instance of a class to be distinguished from each other.
  *constructor = Napi::Persistent(func);

  // Store the constructor as the add-on instance data. This will allow this
  // add-on to support multiple instances of itself running on multiple worker
  // threads, as well as multiple instances of itself running in different
  // contexts on the same thread.
  //
  // By default, the value set on the environment here will be destroyed when
  // the add-on is unloaded using the `delete` operator, but it is also
  // possible to supply a custom deleter.
  env.SetInstanceData(constructor);

  exports.Set("Micropolis", func);
  return exports;
}

Napi::Value MicropolisWrapper::getVersion(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  return Napi::String::New(env, this->_micropolis->getMicropolisVersion());
}

// This callback hook glues javascript into Micropolis's language
// independent callback mechanism.
//
// Arguments:
//
// micropolis: the C++ micropolis object
//
// data: a void pointer which came from micropolis->data,
// that is actually a PyObject * to a Python callback function.
//
// name: the name of the callback message.
//
// params: a string describing the types of the additional parameters.
//
// arglist: a list of arguments (in a varargs va_list), described by params.
//
// There is one character in the param string per vararg
// parameter. The following parameter types are currently
// supported:
//
// i: integer
// f: float
// s: string
//
void napiCallbackHook(
    Micropolis *micropolis,
    void *data,
    const char *name,
    const char *params,
    va_list arglist)
{
  // Get the Napi PyObject *micropolisObj wrapper from
  // the userData of the micropolis. If the userData is NULL,
  // then somebody forgot to set the it, so we do nothing.
  if (micropolis->userData == NULL)
  {
    // We have not been hooked up yet, so do nothing.
    return;
  }

  MicropolisWrapper *micropolisWrapper = (MicropolisWrapper *)micropolis->userData;

  // Cast the void *data into a Napi::Function *callback.
  Napi::FunctionReference *callback = (Napi::FunctionReference *)data;

  // We will pass a PyObject wrapper of micropolis,
  // a Napi callback name string, and the params
  // to the Napi callback function.
  int paramCount = 2 + ((params == NULL) ? 0 : (int)strlen(params));

  // Put the parameters together in a tuple of
  // the appropriate size.
  std::vector<Napi::Value> paramTuple = std::vector<Napi::Value>();

  // Need to increment the reference count here.
  // Py_INCREF(micropolisObj);

  Napi::Env env = micropolisWrapper->Env();

  // Pass the Napi micropolis wrapper as the first parameter.
  paramTuple.push_back(micropolisWrapper->Value());

  // Pass the callback name as the next parameter.
  paramTuple.push_back(Napi::String::New(env, name));

  // Now pass the params as the subsequent parameters,
  // according to their type specified in params.
  if (params != NULL)
  {
    char ch;
    while ((ch = *params++) != '\0')
    {
      switch (ch)
      {

      case 'd':
      {
        // Pass an integer.
        int d = va_arg(arglist, int);
        paramTuple.push_back(Napi::Number::New(env, d));
        break;
      }

      case 'b':
      {
        // Pass a boolean.
        bool b = va_arg(arglist, int) ? true : false;
        paramTuple.push_back(Napi::Boolean::New(env, b));
        break;
      }

      case 'F':
      {
        // Pass a double.
        double d = va_arg(arglist, double);
        paramTuple.push_back(Napi::Number::New(env, d));
        break;
      }

      case 's':
      {
        // Pass a string.
        char *s = va_arg(arglist, char *);
        paramTuple.push_back(Napi::String::New(env, s));
        break;
      }

      default:
      {
        // Unrecognized type code.
        break;
      }
      }
    }
  }

  // callback->Call({Napi::String::New(env, "test")});
  //  Now call the javascript callback with all the parameters.
  const std::vector<napi_value> args(paramTuple.begin(), paramTuple.end());
  callback->Call(args);

  // Clean up nicely.
  // Py_XDECREF(result);
  // Py_XDECREF(paramTuple);
}

void MicropolisWrapper::registerCallback(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsFunction())
  {
    Napi::TypeError::New(env, "Callback function expected").ThrowAsJavaScriptException();
    return;
  }

  // XXX: release the previous reference?
  callback = Napi::Persistent(info[0].As<Napi::Function>());

  this->_micropolis->callbackData = &callback;
  this->_micropolis->callbackHook = napiCallbackHook;
}

void MicropolisWrapper::generateSomeCity(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 1)
  {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return;
  }

  if (!info[0].IsNumber())
  {
    Napi::TypeError::New(env, "Wrong argument").ThrowAsJavaScriptException();
    return;
  }
  int seed = info[0].As<Napi::Number>();
  this->_micropolis->generateSomeCity(seed);
}

void MicropolisWrapper::simTick(const Napi::CallbackInfo &info)
{
  this->_micropolis->simTick();
}

void MicropolisWrapper::setSpeed(const Napi::CallbackInfo &info, const Napi::Value &value)
{
  Napi::Env env = info.Env();
  if (!value.IsNumber())
  {
    Napi::TypeError::New(env, "Wrong value").ThrowAsJavaScriptException();
  }

  Napi::Number speed = value.As<Napi::Number>();
  this->_micropolis->setSpeed(speed.Int32Value());
}

Napi::Value MicropolisWrapper::getSpeed(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  return Napi::Number::New(env, this->_micropolis->simSpeed);
}

Napi::Value MicropolisWrapper::doTool(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 3)
  {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
  }

  if (!info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber())
  {
    Napi::TypeError::New(env, "Wrong argument").ThrowAsJavaScriptException();
  }

  int toolId = info[0].As<Napi::Number>();
  int tileX = info[1].As<Napi::Number>();
  int tileY = info[2].As<Napi::Number>();
  EditingTool tool = static_cast<EditingTool>(toolId);
  ToolResult result = this->_micropolis->doTool(tool, tileX, tileY);
  return Napi::Number::New(env, result);
}

Napi::Value MicropolisWrapper::getMap(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  unsigned short *data = this->_micropolis->map[0];
  Napi::ArrayBuffer mapBuffer =
      Napi::ArrayBuffer::New(env, data, sizeof(unsigned short) * WORLD_W * WORLD_H);
  return Napi::Uint16Array::New(env, WORLD_W * WORLD_H, mapBuffer, 0);
}

Napi::Value MicropolisWrapper::getTotalFunds(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  return Napi::Number::New(env, this->_micropolis->totalFunds);
}

Napi::Value MicropolisWrapper::getPopulation(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  return Napi::Number::New(env, this->_micropolis->cityPop);
}

Napi::Value MicropolisWrapper::getCityTime(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  return Napi::Number::New(env, this->_micropolis->cityTime);
}

static Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  MicropolisWrapper::Init(env, exports);
  return exports;
}

NODE_API_MODULE(MicropolisEngine, Init)
