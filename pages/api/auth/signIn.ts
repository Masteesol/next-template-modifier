// pages/api/signIn.js

import { getUserInfo } from '@/api/profile';
import supabase from '@/utils/initSupabase';
import cookie from 'cookie';

import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    const userData = await getUserInfo(data?.session?.user?.id ? data.session.user.id : "")

    if (error) {
        console.log('Error: ', error.message);
        return res.status(401).json({ error: error.message });
    }


    // Store the session in secure cookies
    res.setHeader('Set-Cookie', [
        cookie.serialize('supabaseToken', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 31536000, // 1 year
            path: '/',
        }),
        cookie.serialize('email', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 31536000, // 1 year
            path: '/',
        }),
        cookie.serialize('userID', data.session.user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 31536000, // 1 year
            path: '/',
        }),
    ]);

    res.status(200).json({ name: userData, email: email });
}
