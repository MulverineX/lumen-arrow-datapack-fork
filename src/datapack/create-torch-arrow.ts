import { execute, MCFunction, Recipe, tag } from "sandstone";
import { RecipeJSON } from "sandstone/arguments/index";
import { createLumenSelectors } from "./selectors.ts";
import { buildLumenArrowDefaults } from "./shared.ts";

export function createTorchArrow(options: {
    label: string;
    color: number;
    torchId: string;
    createParticle: () => void;
}) {
    const { label, color, torchId, createParticle } = options;
    const resultDefaults = buildLumenArrowDefaults({
        customName: label,
        customColor: color,
    });
    const newTag = `${torchId}_arrow`;
    const selector = createLumenSelectors(label, newTag);

    // Recipes for this arrow type
    Recipe(`${torchId}_arrow_1`, {
        type: "crafting_shapeless",
        group: "lumen_arrows",
        category: "equipment",
        ingredients: ["#arrows", torchId],
        result: resultDefaults,
    } as RecipeJSON);

    Recipe(`${torchId}_arrow_2`, {
        type: "crafting_shapeless",
        group: "lumen_arrows",
        category: "equipment",
        ingredients: ["#arrows", "#arrows", torchId],
        result: {
            ...resultDefaults,
            count: 2,
        },
    } as RecipeJSON);

    // Tags arrow items for future manipulation
    MCFunction(
        `${torchId}_tag_arrow`,
        () => tag(selector.untagged).add(newTag),
        { runOnLoad: false, runEveryTick: true }
    );

    // If arrows are in the ground in a block that can place a torch,
    // run another function to handle torch placement
    // execute as @e[tag=torch_arrow,nbt={inGround:1b},tag=!arrow_ignore] at @s if block ~ ~ ~ #arrows:torchable unless block ~ ~ ~ #arrows:torchunable run function arrows:torch
    MCFunction(
        `${torchId}_replace_arrow`,
        () => {
            /* TORCH PLACEMENT */
            // Place the actual torch
            // execute unless block ~ ~ ~0.1 #arrows:torchable run setblock ~ ~ ~ minecraft:wall_torch[facing=north] destroy
            // execute unless block ~ ~ ~-0.1 #arrows:torchable run setblock ~ ~ ~ minecraft:wall_torch[facing=south] destroy
            // execute unless block ~-0.1 ~ ~ #arrows:torchable run setblock ~ ~ ~ minecraft:wall_torch[facing=east] destroy
            // execute unless block ~0.1 ~ ~ #arrows:torchable run setblock ~ ~ ~ minecraft:wall_torch[facing=west] destroy
            // execute unless block ~ ~ ~ minecraft:wall_torch run setblock ~ ~ ~ minecraft:torch destroy
            // Play a sound when placed
            // playsound block.wood.place master @a ~ ~ ~
            // Remove the arrow now that we've placed a torch
            // kill @s
        },
        { runOnLoad: false, runEveryTick: true }
    );

    // Add a particle effect for this type of arrow
    MCFunction(
        `${torchId}_add_arrow_particle`,
        () => execute.as(selector.flying).at("@s").run(createParticle),
        { runOnLoad: false, runEvery: 2 }
    );
}
