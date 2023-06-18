import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/initSupabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log('Error during sign out:', error.message);
        return res.status(500).json({ error: 'Error during sign out' });
    }

    // Clear all cookies
    res.setHeader('Set-Cookie', [
        'supabaseToken=; Max-Age=0; Path=/; HttpOnly',
        'email=; Max-Age=0; Path=/; HttpOnly',
        'userID=; Max-Age=0; Path=/; HttpOnly',
    ]);

    return res.status(200).json({ message: 'Signed out' });
}
