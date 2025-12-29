import { relative } from "sandstone/variables/Coordinates";

export const HERE = relative();
export const SLIGHTLY_NORTH =  relative(0, 0, .1);
export const SLIGHTLY_SOUTH = relative(0, 0, -.1);
export const SLIGHTLY_WEST = relative(.1, 0, 0);
export const SLIGHTLY_EAST = relative(-.1, 0, 0);
