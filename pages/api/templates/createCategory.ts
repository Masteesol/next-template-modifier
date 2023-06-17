import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { category_name, user_id } = req.body;

        const { data, error } = await supabase
            .from('categories')
            .insert([{
                category_name,
                user_id
            }])
            .select()

        if (error) return res.status(401).json({ error: error.message });
        return res.status(200).json(data);
    }
}