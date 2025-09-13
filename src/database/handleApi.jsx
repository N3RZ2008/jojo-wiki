import { useEffect, useState } from "react"
import { api } from "./api"

export function findAll(coll) {
    const [find, setFind] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${api}/${coll}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => {
                setFind(data);
                setLoading(false);
            })
            .catch((e) => {
                console.error("findOne error:", e);
                setFind(null);
                setLoading(false);
            })
    }, [coll])

    return { find, loading }
}

export function findOne(coll, name) {
    const [find, setFind] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${api}/${coll}/${name}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then((data) => {
                setFind(data);
                setLoading(false);
            })
            .catch((e) => {
                console.error("findOne error:", e);
                setFind(null);
                setLoading(false);
            })
    }, [coll, name])

    return { find, loading }
}

export async function insertOne(coll, data) {
    const res = await fetch(`${api}/${coll}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to create")
    return res.json()
}

export async function updateOne(coll, id, data) {
    const res = await fetch(`${api}/${coll}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to update")
}

export async function deleteOne(coll, id) {
    const res = await fetch(`${api}/${coll}/${id}`, {
        method: "DELETE"
    })
    if (!res.ok) throw new Error("Failed to delete")
}
