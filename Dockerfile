FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY index.ts ./

RUN bun install
EXPOSE 3000

CMD ["bun", "run", "index.ts"]
