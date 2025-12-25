import { particle } from "sandstone";
import { createTorchArrow } from "./create-torch-arrow.ts";
import { PLAYERS } from "./selectors.ts";
import { LumenArrowName } from "./shared.ts";

const defaultParticle = {
    position: ["~", "~", "~"] as [string, string, string],
    deviation: [0.05, 0.05, 0.05] as [number, number, number],
    speed: 0,
    scale: 1,
    mode: "force" as const,
};

const playersBeyond4Blocks = PLAYERS.beyondDistance(4);

createTorchArrow({
    label: LumenArrowName.TORCH,
    color: 0xffff00,
    torchId: "torch",
    createParticle: () => {
        particle(
            "flame",
            defaultParticle.position,
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
            playersBeyond4Blocks
        );
    },
});

createTorchArrow({
    label: LumenArrowName.SOUL,
    color: 0x0000ff,
    torchId: "soul_torch",
    createParticle: () => {
        particle(
            "soul_fire_flame",
            defaultParticle.position,
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
            playersBeyond4Blocks
        );
    },
});

createTorchArrow({
    label: LumenArrowName.COPPER,
    color: 0x00ff00,
    torchId: "copper_torch",
    createParticle: () => {
        particle(
            // Todo: Library hasn't updated string constants yet
            "copper_fire_flame" as "flame",
            defaultParticle.position,
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
            playersBeyond4Blocks
        );
    },
});

createTorchArrow({
    label: LumenArrowName.REDSTONE,
    color: 0xff0000,
    torchId: "redstone_torch",
    createParticle: () => {
        particle(
            //  Todo: Library doesn't yet generate the correct dust string
            "dust{color:[1,0,0],scale:1}" as "flame",
            ["~", "~-0.25", "~"],
            defaultParticle.deviation,
            defaultParticle.speed,
            defaultParticle.scale,
            defaultParticle.mode,
            playersBeyond4Blocks
        );
    },
});
