all: machine.js

machine.js: *.nelua
	nelua machine.nelua --cc=emcc -o public/machine.js --verbose

clean:
	rm -f public/machine.js public/machine.wasm
