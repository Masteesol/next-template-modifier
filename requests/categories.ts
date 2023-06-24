// src/api/templates.ts
import checkEnv from "@/utils/checkEnv"
export const createCategory = async (category_name: string, user_id: string) => {
    const baseUrl = checkEnv()
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

export const removeCategory = async (categoryId: string, user_id: string) => {
    //console.log(categoryId, user_id)
    const baseUrl = checkEnv()
    const res = await fetch(baseUrl + '/api/templates/removeCategory', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_id: categoryId, user_id })
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

export const updateCategory = async (category_id: string, user_id: string, title: string) => {
    const baseUrl = checkEnv()
    const res = await fetch(baseUrl + `/api/templates/updateCategory`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_id, userId: user_id, title: title })
    });

    if (!res.ok) {
        console.error('Response not ok, status:', res.status, 'status text:', res.statusText);
        throw new Error(res.statusText);
    }

    const responseBody = await res.json();
    if (!responseBody) {
        console.error('Response body is null or undefined');
        throw new Error('No response body');
    }

    if (responseBody.error) {
        throw new Error(responseBody.error);
    }
    return responseBody;
}


