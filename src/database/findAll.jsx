import { useEffect, useState } from "react"
import { api } from "./api"

export default function findAll(coll) {
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