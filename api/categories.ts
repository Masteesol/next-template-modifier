// src/api/templates.ts

const createCategory = async (category_name: string, user_id: string) => {
    const devUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL as string;
    const prodUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    const baseUrl = process.env.NEXT_PUBLIC_API_ENV === 'development' ? devUrl : prodUrl
    const response = await fetch(baseUrl + "/api/templates/createCategory", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category_name,
            user_id
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error creating category");
    }
}

export default createCategory