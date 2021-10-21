import Mustache from "mustache";
import fs from "fs";
import path from "path";
import postRaw from "./templates/post.js";

export function createMarkdown({ postPath, slugAlias, title, tag, created }) {
    try {
        const rendered = Mustache.render(postRaw, {
            title,
            slugAlias,
            tag,
            created,
            excerpt: "Lorem ipsum...",
        });

        const markdownPath = path.resolve(postPath, "index.md");

        fs.writeFile(markdownPath, rendered, function (err) {
            console.log(err);
        });
    } catch (err) {
        console.error(err);
    }
}
