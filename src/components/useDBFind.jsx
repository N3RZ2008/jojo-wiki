import { useEffect, useState } from "react"

export default function useDBFind(coll, filter) {
    const [find, setFind] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/${coll}`)
            .then(res => res.json())
            .then(data => {
                setFind(data)
                setLoading(false)
            })
            .catch(e => {
                console.error(e)
                setLoading(false)
            })
    }, [coll])

    if (filter) {
        const findFilter = find.filter((page) => page.data.pageName === filter)
        return {findFilter, loading}
    }

    return {find, loading}
}
