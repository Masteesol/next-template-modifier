import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('User ID:', req.query.user_id); // Log the user ID

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('users')
            .select(`
              first_name,
              last_name
            `)
            .eq('id', req.query.user_id)

        console.log('Supabase query result:', data, error); // Log the query result

        if (error) return res.status(401).json({ error: error.message })
        return res.status(200).json(data)
    }
    if (req.method === 'PUT') {
        const { data, error } = await supabase
            .from('users')
            .update(`
              first_name,
              last_name
            `)
            .eq('user_id', req.query.user_id)
            .select()

        console.log('Supabase query result:', data, error); // Log the query result

        if (error) return res.status(401).json({ error: error.message })
        return res.status(200).json(data)
    }
}
