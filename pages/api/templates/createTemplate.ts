import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { template_id, title, text, category_id, user_id } = req.body;

        try {
            const { data, error } = await supabase
                .from('templates')
                .insert([{
                    template_id,
                    title,
                    text,
                    category_id,
                    user_id
                }])
                .select()

            console.log('Insert result:', data, error);

            if (error) return res.status(401).json({ error: error.message });
            return res.status(200).json(data);
        } catch (error) {
            console.error('Unexpected error:', error);
            return res.status(500).json({ error: 'Unexpected error' });
        }
    }
}
