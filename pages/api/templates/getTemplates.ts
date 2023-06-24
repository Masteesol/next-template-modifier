import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('User ID:', req.query.userId); // Log the user ID

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('categories')
            .select(`
              category_id,
              category_name,
              templates (template_id, title, text)
            `)
            .eq('user_id', req.query.userId)

        console.log('Supabase query result:', data, error); // Log the query result

        if (error) return res.status(401).json({ error: error.message })
        return res.status(200).json(data)
    }
    //POST
}
