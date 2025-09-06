import { connect } from "./connect.js"

export default async function handler(req, res) {
	try {
		const db = await connect()

		if (req.method === "POST") {
			//CREATE
			const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body
			const result = db.collection("stands").insertOne(body)
			return res.status(201).json({
				message: "Page created sucessfully",
				insertedId: result.insertedId
			})
		}

		if (req.method === "GET") {
			//READ
			const docs = await db.collection("stands").find().toArray()
			return res.status(200).json(docs)
		}

		return res.status(405).json({ error: "Method Not Allowed" });

	} catch (e) {
		console.error("API /api/stands error:", e)
		res.status(500).json({ error: "Connection error" })
	}
}
