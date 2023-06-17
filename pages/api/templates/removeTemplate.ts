import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { template_id, user_id } = req.body;
        console.log(template_id)

        const { error: deleteTempError } = await supabase
            .from('templates')
            .delete()
            .eq("template_id", template_id)
            .match({ user_id })

        if (deleteTempError)
            return res.status(401).json({ error: deleteTempError });

        return res.status(200).json({ status: "Template removed successfully" });
    }
}