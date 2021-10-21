import inquirer from "inquirer";
import fs from "fs";
import { createMarkdown } from "./markdown-helper";
import path from "path";
import slug from "slug";

const defaultDir = path.resolve("content", "posts");

export async function promptNewPost(options) {
    if (options.skipPrompts) {
        return options;
    }

    const questions = [];

    if (!options.title) {
        questions.push({
            type: "input",
            name: "title",
            message: "Enter title: ",
            default: "",
        });
    }

    if (!options.tag) {
        questions.push({
            type: "input",
            name: "tag",
            message: "Enter tag: ",
            default: "",
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        title: options.title || answers.title,
        tag: options.tag || answers.tag,
    };
}

export function createPost(options) {
    let todayDate = new Date().toISOString().slice(0, 10);
    const postTitle = options.title ? options.title : "new blank post";
    const slugAlias = slug(todayDate + "-" + postTitle, "-").toLowerCase();
    const tag = options.tag;
    const postPath = path.resolve(__dirname, defaultDir, slugAlias);
    console.log("path ", postPath);

    // create the new folder.
    try {
        if (!fs.existsSync(postPath)) {
            fs.mkdirSync(postPath);
        } else {
            console.log("The post is existed.");
            return;
        }
    } catch (err) {
        console.error(err);
    }

    createMarkdown({
        postPath: postPath,
        slugAlias: slugAlias,
        title: postTitle,
        tag: tag,
        created: todayDate,
    });
    console.log("Created: " + postTitle);
}
