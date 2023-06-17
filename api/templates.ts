// src/api/templates.ts

const createTemplate = async (template_id: string, title: string, text: string, category_id: string) => {
    const devUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL as string;
    const prodUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    const baseUrl = process.env.NEXT_PUBLIC_API_ENV === 'development' ? devUrl : prodUrl
    const response = await fetch(baseUrl + "/api/templates/createTemplate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            template_id,
            title,
            text,
            category_id
        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log("templates created", data)
        return data;
    } else {
        throw new Error("Error creating template");
    }
}

export default createTemplate
