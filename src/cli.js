import arg from "arg";
import { promptNewPost, createPost } from "./new-post";

export async function cli(args) {
    const defaultTemplate = "post";
    let options = {
        skipPrompts: false,
        template: defaultTemplate,
    };
    options = await promptNewPost(options);
    createPost(options);
}
