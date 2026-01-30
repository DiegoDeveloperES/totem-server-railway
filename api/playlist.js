const express = require("express");
const router = express.Router();
const { fetchRSS } = require("../services/rssService");

const BASE_PUBLIC_URL =
  process.env.BASE_PUBLIC_URL ||
  process.env.BASE_URL_PROD ||
  process.env.BASE_URL ||
  "";

router.get("/", async (req, res) => {
  try {
    const rssItems = await fetchRSS();

    const mediaUrl = (path) => {
      if (!BASE_PUBLIC_URL) {
        console.error("❌ BASE_PUBLIC_URL não definida");
        return path; // fallback
      }
      return `${BASE_PUBLIC_URL}${path}`;
    };

    res.json({
      version: "1.0.0",
      updatedAt: new Date().toISOString(),
      refreshInterval: 300,

      playlist: [
        {
          id: "video-01",
          type: "video",
          duration: 0,
          content: {
            url: mediaUrl("/media/videos/video1.mp4"),
            loop: true,
          },
        },
        {
          id: "image-01",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img1.jpg"),
          },
        },
        {
          id: "image-02",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img2.jpg"),
          },
        },
        {
          id: "video-02",
          type: "video",
          duration: 0,
          content: {
            url: mediaUrl("/media/videos/video2.mp4"),
            loop: true,
          },
        },
        {
          id: "image-03",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img3.jpg"),
          },
        },
        {
          id: "image-04",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img4.jpg"),
          },
        },
                {
          id: "video-03",
          type: "video",
          duration: 0,
          content: {
            url: mediaUrl("/media/videos/video3.mp4"),
            loop: true,
          },
        },
        {
          id: "image-05",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img5.jpg"),
          },
        },
        {
          id: "image-06",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img6.jpg"),
          },
        },
                {
          id: "video-04",
          type: "video",
          duration: 0,
          content: {
            url: mediaUrl("/media/videos/video4.mp4"),
            loop: true,
          },
        },
        {
          id: "image-07",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img7.jpg"),
          },
        },
        {
          id: "image-08",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img8.jpg"),
          },
        },
        {
          id: "rss-01",
          type: "rss",
          duration: 20,
          content: {
            source: "Folha Vitória",
            items: rssItems,
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar playlist" });
  }
});

module.exports = router;
