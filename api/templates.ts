// src/api/templates.ts

import checkEnv from "@/utils/checkEnv";

export const createTemplate = async (template_id: string, title: string, text: string, category_id: string, user_id: string) => {
    const baseUrl = checkEnv()
    const response = await fetch(baseUrl + `/api/templates/createTemplate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            template_id,
            title,
            text,
            category_id,
            user_id
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

export const removeTemplate = async (template_id: string, user_id: string) => {
    console.log("removeTemplate", template_id)
    const baseUrl = checkEnv()
    const res = await fetch(baseUrl + `/api/templates/removeTemplate`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ template_id, user_id })
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const { data, error } = await res.json();
    if (error) {
        throw new Error(error);
    }

    return data;
}

export const updateTemplate = async (template_id: string, user_id: string, text: string, title: string) => {
    console.log("updateTemplate", template_id, user_id, text, title)
    const baseUrl = checkEnv()
    const res = await fetch(baseUrl + `/api/templates/updateTemplate`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ template_id, user_id, text, title })
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const { error } = await res.json();
    if (error) {
        throw new Error(error);
    }

    return res.ok;
}
