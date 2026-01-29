const axios = require("axios");
const xml2js = require("xml2js");
const fs = require("fs-extra");
const path = require("path");

const RSS_URL = "https://www.folhavitoria.com.br/feed/";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = path.join(__dirname, "../media/rss/folha-vitoria");

async function fetchRSS() {
  await fs.ensureDir(OUTPUT_DIR);

  const response = await axios.get(RSS_URL, { timeout: 10000 });
  const parsed = await xml2js.parseStringPromise(response.data);

  const items = parsed.rss.channel[0].item.slice(0, 5);
  const result = [];

  for (const item of items) {
    const title = item.title?.[0] ?? "Sem título";
    const link = item.link?.[0] ?? null;

    let imageUrl = null;

    if (item["content:encoded"]) {
      const match = item["content:encoded"][0].match(/<img[^>]+src="([^">]+)"/);
      if (match) imageUrl = match[1];
    }

    let localImage = null;

    if (imageUrl) {
      try {
        const fileName = path.basename(imageUrl.split("?")[0]);
        const localPath = path.join(OUTPUT_DIR, fileName);

        if (!(await fs.pathExists(localPath))) {
          const img = await axios.get(imageUrl, {
            responseType: "arraybuffer",
            timeout: 10000,
          });
          await fs.writeFile(localPath, img.data);
        }

        // localImage = `${BASE_URL}/media/rss/folha-vitoria/${fileName}`;
        localImage = `/media/rss/folha-vitoria/${fileName}`;
      } catch (err) {
        console.warn("Erro ao baixar imagem:", imageUrl);
      }
    }

    result.push({
      id: item.guid?.[0]?._ ?? link,
      title,
      link,
      image: localImage,
    });
  }

  return result;
}

module.exports = { fetchRSS };
