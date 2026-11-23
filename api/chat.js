export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: req.body.messages,
            temperature: 0.7,
            max_tokens: 1000
        })
    })
    const data = await response.json()

    res.status(200).json(data)
}