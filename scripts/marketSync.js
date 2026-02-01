import admin from "firebase-admin";
import { createClient } from "@supabase/supabase-js";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const firestore = admin.firestore();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function run() {
  console.log("Starting market sync...");

  const marketData = {
    symbol: "AAPL",
    price: 182.45,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("market_prices")
    .upsert(marketData, { onConflict: "symbol" });

  if (error) throw error;

  await firestore
    .collection("market_cache")
    .doc(marketData.symbol)
    .set(marketData);

  console.log("Market sync completed.");
}

run().catch((err) => {
  console.error("Market sync failed:", err);
  process.exit(1);
});
