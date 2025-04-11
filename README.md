# Simple CORS Proxy for Local LLMs

This is a simple proxy server built with Bun that forwards requests to a target URL (defaulting to `http://localhost:11434/`) and adds necessary CORS headers. This is useful for allowing web applications to communicate with local LLMs like Ollama that might not serve the correct CORS headers.

## Setup and Running

1. **Install Dependencies:**

    ```bash
    bun install
    ```

2. **Run the Server:**

    ```bash
    # Optional: Set the target URL (defaults to http://localhost:11434/)
    export PROXY_TARGET="<your_target_url>" 
    
    bun run index.ts
    ```

    The proxy will run on `http://localhost:3000`.

## Running with Docker

1. **Build the Docker Image:**

    ```bash
    docker build -t local-llm-proxy .
    ```

2. **Run the Docker Container:**

    ```bash
    # Optional: Set the target URL
    docker run -p 3000:3000 -e PROXY_TARGET="<your_target_url>" local-llm-proxy
    ```
