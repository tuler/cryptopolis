import { extend } from "@pixi/react";
import { Container, Sprite } from "pixi.js";

// @pixi/react v8 requires registering the pixi.js classes used as JSX elements
// (rendered as <pixiContainer>, <pixiSprite>, ...). Import this module from any
// component that renders those elements so extend() runs before they mount.
extend({ Container, Sprite });
