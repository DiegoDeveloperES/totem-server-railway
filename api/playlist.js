const express = require("express");
const router = express.Router();
const { fetchRSS } = require("../services/rssService");

// Resolve a BASE_URL conforme ambiente
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL_PROD
    : process.env.BASE_URL;

// Helper para montar URL final
const mediaUrl = (path) => `${BASE_URL}${path}`;

router.get("/", async (req, res) => {
  try {
    const rssItems = await fetchRSS();

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
            loop: true
          }
        },
        {
          id: "image-01",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img1.jpg")
          }
        },
        {
          id: "image-02",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img2.jpg")
          }
        },
        {
          id: "video-02",
          type: "video",
          duration: 0,
          content: {
            url: mediaUrl("/media/videos/video2.mp4"),
            loop: true
          }
        },
        {
          id: "video-03",
          type: "video",
          duration: 0,
          content: {
            url: mediaUrl("/media/videos/video3.mp4"),
            loop: true
          }
        },
        {
          id: "image-03",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img3.jpg")
          }
        },
        {
          id: "image-04",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img1.jpg")
          }
        },
        {
          id: "image-05",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img2.jpg")
          }
        },
        {
          id: "video-04",
          type: "video",
          duration: 0,
          content: {
            url: mediaUrl("/media/videos/video4.mp4"),
            loop: true
          }
        },
        {
          id: "image-06",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img3.jpg")
          }
        },
        {
          id: "image-07",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img1.jpg")
          }
        },
        {
          id: "image-08",
          type: "image",
          duration: 15,
          content: {
            url: mediaUrl("/media/imagens/img2.jpg")
          }
        },
        {
          id: "rss-01",
          type: "rss",
          duration: 20,
          content: {
            source: "Folha Vitória",
            items: rssItems
          }
        }
      ]
    });
  } catch (error) {
    console.error("Erro ao gerar playlist:", error);
    res.status(500).json({ error: "Erro ao gerar playlist" });
  }
});

module.exports = router;
