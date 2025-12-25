import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type {
    DatapackConfig,
    ResourcePackConfig,
    SandstoneConfig,
} from "sandstone";

export default {
    name: "lumen_arrow",
    packs: {
        datapack: {
            description: [
                "A ",
                { text: "Sandstone", color: "gold" },
                " datapack.",
            ],
            packFormat: 94.1,
        } as DatapackConfig,
        resourcepack: {
            description: [
                "A ",
                { text: "Sandstone", color: "gold" },
                " resource pack.",
            ],
            packFormat: 94.1,
        } as ResourcePackConfig,
    },
    onConflict: {
        default: "warn",
    },
    namespace: "lumen_arrow",
    packUid: "pboxcTun",
    mcmeta: "latest",
    saveOptions: {
        clientPath: process.env.DATAPACK_CLIENT_PATH,
        customFileHandler: fixLegacyPathNames,
    },
} as SandstoneConfig;

const renamedPaths = [
    "block",
    "entity_type",
    "fluid",
    "function",
    "game_event",
    "item",
    "recipe",
];
const renamePattern = new RegExp(
    String.raw`/(${renamedPaths.join("|")})s/`,
    "g"
);
const repoDirectory = process.cwd();

async function fixLegacyPathNames(
    relativePath: string,
    content: string
): Promise<void> {
    const fixedPath = relativePath.replaceAll(renamePattern, "/$1/");
    const absolutePath = join(repoDirectory, ".sandstone/output", fixedPath);

    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content);
}
