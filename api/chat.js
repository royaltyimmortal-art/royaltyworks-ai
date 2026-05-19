export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({
reply: "Method not allowed"
});
}

try {

const response = await fetch("https://api.openai.com/v1/chat/completions", {

method: "POST",

headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},

body: JSON.stringify({

model: "gpt-4.1-mini",

messages: [

{
role: "system",
content: `
You are Royalty Works AI.

You specialize in:
- SEO
- CRM systems
- workflows
- automation
- business systems
- productivity

Give concise and professional responses.
`
},

{
role: "user",
content: req.body.message
}

],

temperature: 0.7

})

});

const data = await response.json();

const reply =
data.choices?.[0]?.message?.content ||
"No response.";

res.status(200).json({
reply
});

} catch (error) {

res.status(500).json({
reply: "Server error."
});

}

}
