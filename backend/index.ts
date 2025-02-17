import * as fs from "node:fs";
import path from "path";

import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const etag = 'W/"12345-67890"';
const assets = path.join(process.cwd(), "./backend/assets");
const dist = path.join(process.cwd(), "./dist");

app.get("/main.js", async (c) => {
  const js = fs.readFileSync(path.join(assets, "main.js")).toString();

  c.header("Content-Type", "application/javascript");
  return c.body(js, 200);
});

app.get("/go-to-work", async (c) => {
  const html = fs.readFileSync(path.join(assets, "index.html")).toString();

  return c.html(html);
});

app.get("/assets/*", async (c) => {
  const resourcePath = path.join(dist, c.req.path);
  const resourceContent = fs.readFileSync(resourcePath).toString();

  // Check browser cache headers
  const ifNoneMatchHeader = c.req.header("If-None-Match");

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  // Set cache headers
  c.header("Cache-Control", "max-age=0,must-revalidate");
  c.header("ETag", `"${etag}"`);

  // Set MIME type
  if (resourcePath.endsWith(".css")) {
    c.header("Content-Type", "text/css");
  } else if (resourcePath.endsWith(".js")) {
    c.header("Content-Type", "application/javascript");
  }

  if (ifNoneMatchHeader === `"${etag}"`) {
    c.status(304);
    return c.body("");
  }

  return c.body(resourceContent, 200);
});

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

app.get("/*", async (c) => {
  const html = fs.readFileSync(path.join(dist, "index.html")).toString();

  await sleep(500);

  return c.html(html);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
