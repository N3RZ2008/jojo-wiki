import { connect } from "../connect.js";

export default async function handler(req, res) {
  try {
    const db = await connect();
    const { name } = req.query;

    if (req.method === "GET") {
      // READ ONE
      const doc = await db.collection("stands").findOne({"data.pageName": name});
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(doc);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    console.error("API /api/stands/[id] error:", e);
    return res.status(500).json({ error: "Connection error" });
  }
}
