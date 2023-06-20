import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/initSupabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { email, password, first_name, last_name } = req.body;
    console.log(email, password, first_name, last_name)
    // 1. Sign up the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        console.error('Error signing up:', error.message);
        return res.status(401).json({ error: error.message });
    }

    console.log(data)

    const { error: userError } = await supabase
        .from('users')
        .insert([
            {
                id: data.user?.id,
                first_name,
                last_name,
            },
        ]);

    if (userError) {
        console.error('Error creating user profile:', userError.message);
        return res.status(401).json({ error: userError.message });
    }


    return res.status(200).json(data);
}
