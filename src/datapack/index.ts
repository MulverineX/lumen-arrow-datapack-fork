import { particle } from "sandstone";
import { createTorchArrow } from "./create-torch-arrow.ts";
import * as Selectors from "./selectors.ts";
import * as Positions from "./positions.ts";

const defaultParticle = [
    // Todo: Sandstone will update the delta argument in the future
    // Delta
    [0.05, 0.05, 0.05] as [number, number, number],
    // Speed
    0,
    // Count
    1,
    // Mode
    "force"
] as const;

const defaultParticleWithPos = [
    // Pos
    Positions.HERE,
    ...defaultParticle
] as const

const beyond4Blocks = Selectors.createPlayerBeyondDistanceSelector(4);

createTorchArrow({
    label: "Torch Arrow",
    color: 0xffd604,
    torchId: "torch",
    wallTorchId: "wall_torch",
    nonArrowIngredients: ["#coals"],
    createParticle: () => {
        particle(
            "flame",
            ...defaultParticleWithPos,
            beyond4Blocks
        );
    },
});

createTorchArrow({
    label: "Soul Torch Arrow",
    color: 0x61f4f8,
    torchId: "soul_torch",
    wallTorchId: "soul_wall_torch",
    nonArrowIngredients: ["#coals", "soul_soil"],
    createParticle: () => {
        particle(
            "soul_fire_flame",
            ...defaultParticleWithPos,
            beyond4Blocks
        );
    },
});

createTorchArrow({
    label: "Copper Torch Arrow",
    color: 0x9aeb9a,
    torchId: "copper_torch",
    wallTorchId: "copper_wall_torch",
    nonArrowIngredients: ["#coals", "copper_nugget"],
    createParticle: () => {
        particle(
            // Todo: Library hasn't updated string constants yet.
            "copper_fire_flame" as "flame",
            ...defaultParticleWithPos,
            beyond4Blocks
        );
    },
});

createTorchArrow({
    label: "Redstone Torch Arrow",
    color: 0xf76d6d,
    torchId: "redstone_torch",
    wallTorchId: "redstone_wall_torch",
    nonArrowIngredients: ["redstone"],
    createParticle: () => {
        particle(
            // Todo: Library hasn't updated string constants yet.
            "dust{color:[1,0,0],scale:1}" as "flame",
            ["~", "~-0.25", "~"],
            ...defaultParticle,
            beyond4Blocks
        );
    },
});
