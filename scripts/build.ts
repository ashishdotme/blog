import path from "node:path";
import fs, { PathLike } from "node:fs";
import matter from "gray-matter";
import { Post } from "./types.ts";
import { markdownProcessor } from "./markdown-processor.ts";
import process from "node:process";

const generateSlug = (title: string): string => {
  return title
    .split(" ")
    .map((word) => word.toLowerCase().replace(/[^0-9a-z]/g, ""))
    .join("-");
};

const extractPostData = async (filePath: PathLike): Promise<Post> => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  if (!content || !data) {
    throw new Error("File missing required content");
  }

  const htmlContent = await markdownProcessor(content);
  const { title, description, coverImageUrl, date, tags, topic } = data;

  if (!title || !topic || !date || !tags) {
    throw new Error("A required field is missing");
  }

  return {
    title,
    topic,
    description,
    content: htmlContent,
    coverImageUrl,
    date,
    tags,
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

const generateJson = async (postFolder: string) => {
  const fileName = fetchFilenamesFromFolder(postFolder);
  const promises = fileName.map((fileName) =>
    extractPostData(path.join(process.cwd(), postFolder, fileName))
  );

  const data = await Promise.all(promises);
  saveToFile(data, "api/posts/all.json");
  return { data };
};

async function main() {
  const { data } = await generateJson("posts");
  console.log(data);
}

await main();
