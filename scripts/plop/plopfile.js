export default async function (plop) {
  await plop.load("./generators/post.js");
  await plop.load("./generators/now.js");
  await plop.load("./generators/weekly.js");
}
