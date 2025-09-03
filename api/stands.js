import { connect } from "./connect.js"

export default async function handler(req, res) {
  try {
    const db = await connect()
    const docs = await db.collection("stands").find().toArray()
    res.status(200).json(docs)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: "Connection error" })
  }
}
