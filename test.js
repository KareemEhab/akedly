import akedly from "./index.js";

akedly.setAPIKey(
  "47749a70960aea5638521f382e943dce8ec8123e9bcd1f5928d637e81a189441"
);

akedly.setPipelineID("680fba5e9f9cfd6b27549f78");

const transaction = await akedly.createTransaction(
  "kareem.e.hamouda@gmail.com",
  "+201151119085"
);
console.log(transaction);

const id = await akedly.activateTransaction();
console.log(id);

// await akedly.verifyOTP("111981", "681537879f9cfd6b2754b862");
