import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { template_id, user_id } = req.body;

        const { data: template, error } = await supabase
            .from('templates')
            .select('user_id')
            .match({ id: template_id })

        if (error || !template || template[0].user_id !== user_id)
            return res.status(401).json({ error: error?.message || "Unauthorized" });

        const deleteError = await supabase
            .from('templates')
            .delete()
            .match({ id: template_id })

        if (deleteError)
            return res.status(401).json({ error: deleteError });

        return res.status(200).json({ status: "Template removed successfully" });
    }
}