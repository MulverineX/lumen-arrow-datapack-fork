import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type {
    DatapackConfig,
    ResourcePackConfig,
    SandstoneConfig,
} from "sandstone";
import { config } from "dotenv";

// Todo: When Sandstone moves to Bun this will no longer be necessary.
// I'd prefer to use `node --env-file=.env` but it cannot work that way
config();

export default {
    name: "lumen_arrow",
    packs: {
        datapack: {
            description: [
                "A ",
                { text: "Lumen Arrows", color: "gold" },
                " Minecraft datapack.",
            ],
            packFormat: 94.1,
        } as DatapackConfig,
        resourcepack: {
            description: [
                "A ",
                { text: "Lumen Arrows", color: "gold" },
                " Minecraft resource pack.",
            ],
            packFormat: 94.1,
        } as ResourcePackConfig,
    },
    onConflict: {
        // Todo: When you do an execute inside a function,
        //  it creates a "execute_as" function but never calls said function.
        //  If you run 2 executes within the same function,
        //  it warns that it is trying to create multiple functions with the same name.
        //  Since it is never running this extra function I think it is safe to ignore.
        //  This is a bug in 1.0.0-beta.0 that will be fixed in beta 1.
        default: "ignore",
    },
    namespace: "lumen_arrow",
    packUid: "pboxcTun",
    mcmeta: "latest",
    saveOptions: {
        clientPath: process.env.DATAPACK_CLIENT_PATH,
        customFileHandler: fixLegacyPathNames,
    }
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
