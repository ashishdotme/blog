import remarkEmbedder from "@remark-embedder/core";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkInlineLinks from "remark-inline-links";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkUnwrapImages from "remark-unwrap-images";
import { getSingletonHighlighter } from "shiki";
import { unified } from "unified";
import theme from "./shades-of-purple-color-theme.json" assert { type: "json" };

export async function markdownProcessor(markdown: string) {
  const options: any = {
    theme,
    keepBackground: true,
    getHighlighter: (options: any) =>
      getSingletonHighlighter({
        ...options,
        themes: [theme],
      }),
  };

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkUnwrapImages)
    .use(remarkInlineLinks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, options)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
