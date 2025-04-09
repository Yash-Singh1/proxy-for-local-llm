import { serve } from "bun";

const PROXY_TARGET = "http://localhost:11434/"; // Replace with your target URL

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Private-Network": "true",
  "Access-Control-Max-Age": "86400",
};

const server = serve({
  port: 3000,
  async fetch(req) {
    console.log("Handling request", req);
    // Handle preflight requests
    if (req.method === "OPTIONS") {
      console.log("Handling preflight request", req);
      return new Response(null, {
        headers: new Headers(corsHeaders),
      });
    }

    const url = new URL(req.url);
    const targetUrl = new URL(url.pathname + url.search, PROXY_TARGET);

    // Forward the request
    const body = await req.text();
    const proxyRequest = new Request(targetUrl, {
      method: req.method,
      headers: req.headers,
      body,
    });

    try {
      const response = await fetch(proxyRequest);
      const responseHeaders = new Headers(response.headers);

      // Add CORS headers to the response
      Object.entries(corsHeaders).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error("Proxy error:", error);
      return new Response("Proxy Error", { status: 500 });
    }
  },
});

console.log(`Proxy server running at http://localhost:${server.port}`);
