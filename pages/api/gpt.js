import { apiKey } from "../constants/api.key";
import { organization } from "../constants/api.key";

export default async function handler(req, res) {


    const requestText = req.body.requestText;
    const translateTo = req.body.translateTo;
    const model = req.body.model;

    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        body: JSON.stringify({
            model: model,
            prompt: `Translate the following text into ${translateTo}: ${requestText}`,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "Organization": organization
        }
    })
    
    const resJson = await response.json();

    const data = resJson.choices[0].text;

    console.log("=== new request ===");
    console.log("Model:", model,
    "requestText:", requestText,"translateTo:", translateTo, "ResponseData:", data);

    res.status(200).json({ response: data});
  }
  