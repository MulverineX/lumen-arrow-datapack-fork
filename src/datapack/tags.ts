import { Tag } from "sandstone";

export const BLOCK_TAGS = {
    PLACE_ARROW: Tag("blocks", "place_lumen_arrow", [
        "#flowers",
        "#replaceable",
        "copper_torch",
        "copper_wall_torch",
        "redstone_torch",
        "redstone_wall_torch",
        "sculk_vein",
        "soul_torch",
        "soul_wall_torch",
        "torch",
        "wall_torch",
    ]),
    IGNORE_ARROW: Tag("blocks", "ignore_lumen_arrow", ["water", "lava"]),
};

export const IGNORE_ARROW = "ignore_arrow";
