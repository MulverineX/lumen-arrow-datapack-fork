import {
    execute,
    kill,
    MCFunction,
    playsound,
    Recipe,
    setblock,
    tag,
} from "sandstone";
import { RecipeJSON } from "sandstone/arguments/index";
import { createLumenSelectors } from "./selectors.ts";
import { buildLumenArrowDefaults } from "./shared.ts";
import { BLOCK_TAGS } from "./tags.ts";
import * as Positions from "./positions.ts";

const ignoreArrowTag = "ignore_lumen_arrow";

export function createTorchArrow(options: {
    label: string;
    color: number;
    torchId: string;
    wallTorchId: string;
    nonArrowIngredients: string[];
    createParticle: () => void;
}) {
    const {
        label,
        color,
        torchId,
        wallTorchId,
        nonArrowIngredients,
        createParticle,
    } = options;
    const arrowTag = `${torchId}_arrow`;
    const selectors = createLumenSelectors(label, arrowTag);
    const resultDefaults = buildLumenArrowDefaults({
        customName: label,
        customColor: color,
    });
    const setTorch = (faceDirection?: FaceDirection) =>
        setblock(
            Positions.HERE,
            faceDirection ? `${wallTorchId}[facing=${faceDirection}]` : torchId,
            "destroy"
        );

    // Recipes for this arrow type
    Recipe(`${torchId}_arrow_from_torch`, {
        type: "crafting_shapeless",
        group: "lumen_arrows",
        category: "equipment",
        ingredients: ["#arrows", torchId],
        result: resultDefaults,
    } as RecipeJSON);

    Recipe(`${torchId}_arrow_from_raw`, {
        type: "crafting_shapeless",
        group: "lumen_arrows",
        category: "equipment",
        ingredients: ["#arrows", ...nonArrowIngredients],
        result: resultDefaults,
    } as RecipeJSON);

    MCFunction(
        `manage_${torchId}_arrows`,
        () => {
            // Tags arrow items for immediate manipulation
            tag(selectors.untagged).add(arrowTag);

            // If arrows are in the ground in a block that can place a torch,
            // run replace arrow at each arrow's position
            execute
                .as(selectors.groundedNotIgnored)
                .at("@s")
                .if.block(Positions.HERE, BLOCK_TAGS.PLACE_ARROW.name)
                .unless.block(Positions.HERE, BLOCK_TAGS.IGNORE_ARROW.name)
                .run(replaceArrow);

            // Tag arrows that were in blocks that can't place a torch
            tag(selectors.groundedNotIgnored).add(ignoreArrowTag);

            // Add a particle effect for this type of arrow
            execute.as(selectors.flying).at("@s").run(createParticle);
        },
        { runEvery: 10 }
    );

    const replaceArrow = MCFunction(`replace_${torchId}_arrow`, () => {
        /* TORCH PLACEMENT */
        // Unless there is a block to the north, place a north-facing wall torch
        execute.unless
            .block(Positions.SLIGHTLY_NORTH, BLOCK_TAGS.PLACE_ARROW.name)
            .run(() => setTorch("north"));
        // Unless there is a block to the south, place a south-facing wall torch
        execute.unless
            .block(Positions.SLIGHTLY_SOUTH, BLOCK_TAGS.PLACE_ARROW.name)
            .run(() => setTorch("south"));
        // Unless there is a block to the east, place a east-facing wall torch
        execute.unless
            .block(Positions.SLIGHTLY_EAST, BLOCK_TAGS.PLACE_ARROW.name)
            .run(() => setTorch("east"));
        // Unless there is a block to the west, place a west-facing wall torch
        execute.unless
            .block(Positions.SLIGHTLY_WEST, BLOCK_TAGS.PLACE_ARROW.name)
            .run(() => setTorch("west"));
        // Unless there is a block at it's current position, place a regular torch
        execute.unless.block(Positions.HERE, wallTorchId).run(() => setTorch());

        // Play a sound when placed
        playsound("block.wood.place", "player", "@a", Positions.HERE);

        // Remove the arrow now that we've placed a torch
        kill("@s");
    });

    // Add a particle effect for this type of arrow
    MCFunction(
        `add_${torchId}_arrow_particle`,
        () => execute.as(selectors.flying).at("@s").run(createParticle),
        { runEvery: 2 }
    );
}

type FaceDirection = "north" | "south" | "east" | "west";
