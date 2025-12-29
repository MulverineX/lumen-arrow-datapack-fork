import { Selector } from "sandstone";
import { namespaceId } from "./shared.ts";
import { IGNORE_ARROW } from "./tags.ts";

const custom_name = namespaceId({ id: "custom_name" });

export function createPlayerBeyondDistanceSelector(blocks: number) {
    return Selector("@a", { distance: `${blocks}..` });
}

export function createLumenSelectors(label: string, arrowTag: string) {
    return {
        all: Selector("@e", { tag: arrowTag }),
        flying: Selector("@e", { tag: arrowTag, nbt: { inGround: false } }),
        groundedNotIgnored: Selector("@e", {
            tag: [arrowTag, `!${IGNORE_ARROW}`],
            nbt: { inGround: true },
        }),
        untagged: Selector("@e", {
            tag: `!${arrowTag}`,
            nbt: { item: { components: { [custom_name]: { text: label } } } },
        }),
    };
}
