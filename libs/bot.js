
export default async function Talk(prompt) {
    const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({prompt})
    })
    const data = await res.json()
    return data.response
}



