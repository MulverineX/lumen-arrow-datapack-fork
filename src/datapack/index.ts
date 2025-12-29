import { particle } from "sandstone";
import { createTorchArrow } from "./create-torch-arrow.ts";
import * as Selectors from "./selectors.ts";
import * as Positions from "./positions.ts";

const defaultParticle = {
    position: Positions.HERE,
    deviation: [0.05, 0.05, 0.05] as [number, number, number],
    speed: 0,
    scale: 1,
    mode: "force" as const,
};

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
            defaultParticle.position,
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
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
            defaultParticle.position,
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
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
            // Todo: Library hasn't updated string constants yet or I'm using it incorrectly.
            "copper_fire_flame" as "flame",
            defaultParticle.position,
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
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
            // Todo: Library hasn't updated string constants yet or I'm using it incorrectly.
            "dust{color:[1,0,0],scale:1}" as "flame",
            ["~", "~-0.25", "~"],
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
            beyond4Blocks
        );
    },
});
