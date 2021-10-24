import fs from "fs";
import path from "path";

const configFile = path.resolve("gatsby-tool-cli.json");
const defaultConfig = {
    author: "https://devgiangho.github.io",
    postFolder: "content/posts",
};

/**
 * Get post folder, if not created then make the default;
 * @returns postFolder name
 */
export function getPostFolder() {
    try {
        if (!fs.existsSync(configFile)) {
            fs.writeFileSync(configFile, JSON.stringify(defaultConfig, null, 4));
        } else {
            let rawData = fs.readFileSync(configFile);
            const config = JSON.parse(rawData);
            ensurePostFolderExist(config);
            return config.postFolder;
        }
    } catch (err) {
        console.error(err);
    }
    return null;
}

/**
 * Ensure the post folder exists
 * @param {config} config
 */
function ensurePostFolderExist(config) {
    try {
        console.log("Post folder:", config.postFolder);
        const postDir = path.resolve(config.postFolder);
        if (!fs.existsSync(postDir)) {
            fs.mkdirSync(postDir, { recursive: true });
        }
    } catch (err) {
        console.log(err);
    }
}
