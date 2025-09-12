export default async function Insert(coll, data) {

    return "NOT WORKING YET"

    const res = await fetch(`/api/${coll}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to create")
    return res.json()
}
