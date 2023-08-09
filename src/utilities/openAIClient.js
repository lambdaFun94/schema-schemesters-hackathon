const systemPrompt = `You are clever programmer creating database schema`

export const generate = async (contentPrompt) => {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                //    { role: "user", content: contentPrompt },
                //    { role: "assistant", content: sampleResponse },
                { role: "user", content: contentPrompt }
            ]
        })
    });

    const responseData = await response.json();
    return responseData.choices[0].message.content;
}
