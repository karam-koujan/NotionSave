# NotionSave

![NotionSave Demo Gif](https://github.com/karam-koujan/NotionSave/blob/main/ezgif.com-optimize.gif)

Save time while browsing social media platforms like Twitter and YouTube with NotionSave. This convenient Chrome extension allows you to effortlessly capture and store links to valuable posts and videos in your Notion database. No more manual copying and pasting – simply click a button and keep all your useful information organized for easy access later.

## Demo

https://twitter.com/karamkaku/status/1666900099333513236

## Run Locally

Clone the project

```bash
  git clone https://github.com/karam-koujan/NotionSave.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Configuration

```bash
  cd src
  mkdir config
  touch env.js
```

```js
const env = {
  hostname: "http://localhost:3000",
};
export default env;
```

Build

```bash
  npm run build
```

Start the server

```bash
cd server
```

```bash
npm install
npm run dev
```

## Supported Social Media

- Youtube
- Twitter
- Reddit
