import inquirer from "inquirer";
import fs from "fs";
import { createMarkdown } from "./markdown-helper";
import path from "path";
import slug from "slug";

/**
 * Prompt info question for the post
 * @param {*} options
 * @returns
 */
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

/**
 * Create new post
 * @param {options} options 
 * @param defaultDir default post dir
 * @returns 
 */
export function createPost(options, defaultDir) {
    const todayDate = new Date().toISOString();
    const currentYear = todayDate.slice(0, 4);
    const dayAndMonth = todayDate.slice(5, 10);

    const postTitle = options.title ? options.title : "new blank post";
    let slugPostAlias = slug(postTitle, "-").toLowerCase();
    if (slugPostAlias.length > 75) {
        slugPostAlias = slugPostAlias.substring(0, 75);
    }
    const slugFolderAlias = slug(
        dayAndMonth + "-" + slugPostAlias,
        "-"
    ).toLowerCase();

    const tag = options.tag;
    const postPath = path.resolve(defaultDir, currentYear, slugFolderAlias);

    // create the new folder.
    try {
        if (!fs.existsSync(postPath)) {
            fs.mkdirSync(postPath, {recursive:true});
        } else {
            console.log("The post is existed.");
            return;
        }
    } catch (err) {
        console.error(err);
    }

    createMarkdown({
        postPath: postPath,
        slugAlias: slugPostAlias,
        title: postTitle,
        tag: tag,
        created: todayDate,
    });
}
