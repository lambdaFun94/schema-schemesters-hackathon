import axios from 'axios';

export const generate = async (contentPrompt) => {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await axios.post(apiUrl, {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                //    { role: "user", content: contentPrompt },
                //    { role: "assistant", content: sampleResponse },
                { role: "user", content: contentPrompt }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${YEXT_PUBLIC_OPENAI_API_KEY}`
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error generating response:", error);
        throw error;
    }
}
