import path from "node:path";
import fs, { PathLike } from "node:fs";
import matter from "gray-matter";
import { Post } from "./types.ts";
import { markdownProcessor } from "./markdown-processor.ts";
import process from "node:process";
import slugify from "slugify";
import { format } from "date-fns";


const generateSlug = (title: string): string => {
  const options = {
    lower: true,
    remove: /['.]/g,
  };

  return slugify(title, options);
};

const extractPostData = async (filePath: PathLike): Promise<Post> => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  if (!content || !data) {
    throw new Error("Content is missing");
  }

  const htmlContent = await markdownProcessor(content);
  let { title } = data;

  if(typeof title !== "string") {
    title = format(title, "yyyy-MM-dd");
  }

  return {
    ...data,
    title,
    content: htmlContent,
    slug: generateSlug(title as string),
  };
};

const fetchFilenamesFromFolder = (folder: string): string[] => {
  const fullPath = path.join(process.cwd(), folder);
  return fs.readdirSync(fullPath, "utf8");
};

const saveToFile = (data: object, fileName: string) => {
  const jsonData = JSON.stringify(data, null, 2);
  const dir = path.dirname(fileName);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fileName, jsonData, "utf8");
};

const generateJson = async (srcFolder: string, destFolder: string) => {
  const fileName = fetchFilenamesFromFolder(srcFolder);
  const promises = fileName.map((fileName) =>
    extractPostData(path.join(process.cwd(), srcFolder, fileName))
  );

  const data = await Promise.all(promises);
  saveToFile(data, destFolder);
  return { data };
};

async function main() {
  await generateJson("../posts", "../api/posts/all.json");
  await generateJson("../now", "../api/now/all.json");
  await generateJson("../weekly", "../api/weekly/all.json");
}

await main();
