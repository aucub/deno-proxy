import { Hono } from 'hono';

const app = new Hono();

app.all("*", async (c) => {
  const urlString = c.req.url.replace(/^(https?:\/\/)[^/]+\/(.*)$/, "$1$2");
  const url = new URL(urlString)
  const request = new Request(url, c.req.raw);
  const response = await fetch(request);
  const newResponse = new Response(response.body, response);
  return newResponse;
});

export default app;