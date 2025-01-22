FROM node:22

# Установка Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN chown -R node:node /app/uploads

EXPOSE 3000
CMD ["bun", "run", "start:dev"]