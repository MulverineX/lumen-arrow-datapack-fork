export function namespaceId(options: { namespace?: string; id: string }) {
    const { namespace = "minecraft", id } = options;
    return `"${namespace}:${id}"`;
}

export function buildLumenArrowDefaults(options: {
    customName: string;
    customColor: number;
}) {
    const { customName, customColor } = options;
    return {
        id: "tipped_arrow",
        components: {
            potion_contents: {
                custom_color: customColor,
            },
            custom_name: {
                text: customName,
                italic: false,
            },
            tooltip_display: {
                hidden_components: ["potion_contents"],
            },
        },
    };
}

export type PartialRecipeResult = ReturnType<typeof buildLumenArrowDefaults>;
