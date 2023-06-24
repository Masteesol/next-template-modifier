import checkEnv from "@/utils/checkEnv";

export const getUserInfo = async (user_id: string) => {
    const baseUrl = checkEnv()
    const response = await fetch(baseUrl + `/api/profile/user?user_id=${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Retreived user info", data)
        return data[0];
    } else {
        throw new Error("Error retrieving user info");
    }
}

export const updateUserInfo = async (user_id: string, first_name: string, last_name: string) => {
    console.log("user_id", user_id)
    const baseUrl = checkEnv()
    const res = await fetch(baseUrl + `/api/profile/user?user_id=${user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: first_name, last_name: last_name })
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
