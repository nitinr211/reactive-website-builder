const express = require("express");
const axios = require("axios");
const router = express.Router();

const META_API_URL = "https://graph.facebook.com/v18.0";
const TIKTOK_API_URL = "https://business-api.tiktok.com/open_api/v1.3";
const META_ACCESS_TOKEN = "your_meta_access_token";
const TIKTOK_ACCESS_TOKEN = "your_tiktok_access_token";

const createMetaAd = async (ads, budget) => {
  try {
    const response = await axios.post(
      `${META_API_URL}/ad_accounts/your_ad_account_id/campaigns`,
      {
        name: "Test Campaign",
        daily_budget: budget * 100, // Convert to cents
        status: "ACTIVE",
        objective: "CONVERSIONS",
        targeting: { auto_targeting: true },
        creatives: ads,
      },
      {
        headers: { Authorization: `Bearer ${META_ACCESS_TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const createTikTokAd = async (ads, budget) => {
  try {
    const response = await axios.post(
      `${TIKTOK_API_URL}/campaign/create/`,
      {
        advertiser_id: "your_advertiser_id",
        campaign_name: "Test Campaign",
        budget,
        objective_type: "CONVERSIONS",
        delivery_status: "ENABLE",
        targeting: { auto_targeting: true },
        creatives: ads,
      },
      {
        headers: { Authorization: `Bearer ${TIKTOK_ACCESS_TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

router.post("/meta/launch", async (req, res) => {
  try {
    const { ads, budget } = req.body;
    const result = await createMetaAd(ads, budget);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
});

router.post("/tiktok/launch", async (req, res) => {
  try {
    const { ads, budget } = req.body;
    const result = await createTikTokAd(ads, budget);
    res.json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
});

module.exports = router;
