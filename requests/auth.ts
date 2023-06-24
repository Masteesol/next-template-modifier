import checkEnv from "@/utils/checkEnv";
import JSCookie from "js-cookie"

export const setUserInfo = async (first_name: string, last_name: string, email: string) => {
    //console.log(first_name, last_name)
    const fullName = `${first_name} ${last_name}`
    JSCookie.set("full_name", fullName)
    JSCookie.set("public_email", email)
}

export const login = async (email: string, password: string) => {
    const baseUrl = checkEnv()
    console.log("email", email)
    console.log("password", password)
    const response = await fetch(baseUrl + '/api/auth/signIn', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        setUserInfo(data.name.first_name, data.name.last_name, data.email)
        return data;
    } else {
        throw new Error("Error retrieving user info");
    }
}

export const logOut = async () => {
    const baseUrl = checkEnv()

    fetch(baseUrl + '/api/auth/signOut', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => console.log(data)) // Logs "Signed out"
        .catch((err) => console.error(err));
    JSCookie.remove('full_name');
    JSCookie.remove('public_email');
}

export const registerUser = async (email: string, password: string, first_name: string, last_name: string) => {
    //console.log(email, password, first_name, last_name)
    try {
        const response = await fetch('/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                first_name,
                last_name
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
