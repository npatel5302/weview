const axios = require("axios");
const cheerio = require("cheerio");

class ScrapService {
  body;
  productLink;
  constructor(productUrl) {
    this.productLink = productUrl;
  }

  async loadProductDetails() {
    this.body = await axios.get(this.productLink, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
        headless: true,
      },
    });
  }

  async getProductDetails() {
    const $ = cheerio.load(this.body.data);
    return {
      productName: "XYZ",
    };
  }

  async getReviews() {
    const $ = cheerio.load(this.body.data);
    const reviews = $(".review");
    const postTitles = [];
    reviews.each((i, review) => {
      const textReview = $(review).find(".review-text").text();
      postTitles.push(textReview);
    });

    return postTitles;
  }
}

module.exports = ScrapService;