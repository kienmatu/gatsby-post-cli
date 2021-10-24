import { promptNewPost, createPost } from "./new-post";
import { getPostFolder } from "./config-helper";

export async function cli(args) {
    const defaultTemplate = "post";
    let options = {
        skipPrompts: false,
        template: defaultTemplate,
    };

    const defaultDir = getPostFolder();
    if (defaultDir) {
        options = await promptNewPost(options);
        createPost(options, defaultDir);
    } else {
        console.log("Config file created!");
    }
}
