import { useEffect, useState } from "react"
import { api } from "./api"

export function findAll(coll, refresh = 0) {
    const [findAllResults, setFind] = useState(null)
    const [loadingAll, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
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
    }, [coll, refresh])

    return { findAllResults, loadingAll }
}

export function findOne(coll, search) {
    const [find, setFind] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${api}/${coll}/${search}`)
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
    }, [coll, search])

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

export async function updateOne(coll, search, data) {
    const res = await fetch(`${api}/${coll}/${search}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error("Failed to update")
}

export async function deleteOne(coll, search) {
    const res = await fetch(`${api}/${coll}/${search}`, {
        method: "DELETE"
    })
    if (!res.ok) throw new Error("Failed to delete")
}

export function useCheckAdmin(userId) {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (!userId) {
            setIsAdmin(false)
            return
        }

        fetch(`${api}/users/${userId}`)
            .then(res => {
                if (!res.ok) throw new Error("User not found")
                return res.json()
            })
            .then(data => {
                if (data.role === "user") return setIsAdmin(false)
                setIsAdmin(true)
            })
            .catch(() => {
                setIsAdmin(false)
            })
    }, [userId])

    return { isAdmin }
}