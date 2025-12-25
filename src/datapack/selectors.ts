import { Selector } from "sandstone";
import { namespaceId } from "./shared.ts";

const custom_name = namespaceId({ id: "custom_name" });

export const PLAYERS = {
    beyondDistance: (blocks: number) =>
        Selector("@a", { distance: `${blocks}..` }),
};

export function createLumenSelectors(name: string, tag: string) {
    return {
        all: Selector("@e", { tag }),
        flying: Selector("@e", { tag, nbt: { inGround: false } }),
        grounded: Selector("@e", { tag, nbt: { inGround: true } }),
        untagged: Selector("@e", {
            nbt: { item: { components: { [custom_name]: { text: name } } } },
            tag: `!${tag}`,
        }),
    };
}
