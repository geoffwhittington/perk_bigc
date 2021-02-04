/**
 * /load
 *
 * Called when a store owner or user click to load the app
 */

const express = require("express");
const router = express.Router();
const BigCommerce = require("node-bigcommerce");

const bigCommerce = new BigCommerce({
  clientId: process.env.client_id, // set in codesandbox server control panel
  secret: process.env.client_secret, // set in codesandbox server control panel
  responseType: "json",
  apiVersion: "v2"
});

router.get("/", (req, res, next) => {
  try {
    // verify request came from BigCommerce
    const data = bigCommerce.verify(req.query["signed_payload"]);
    if (typeof data.user !== "undefined") {
      res.send("Hello World. The time is " + data.timestamp);
    }

    console.log(process.env.webhook);
    const hook = {
      scope: "store/subscriber/*",
      destination: process.env.webhook,
      is_active: true
    };

    bigCommerce
      .post(`/stores/${data.store_hash}/v2/hooks`, hook)
      .then((data) => {
        // Catch any errors, or handle the data returned
        console.log(data);
      });
  } catch (err) {}
});

module.exports = router;
