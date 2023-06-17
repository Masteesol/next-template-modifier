import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { category_id, user_id } = req.body;

        const { error: deleteTempError } = await supabase
            .from('templates')
            .delete()
            .match({ category_id });

        const { error: deleteCatError } = await supabase
            .from('categories')
            .delete()
            .eq("category_id", category_id)
            .match({ user_id })


        if (deleteCatError || deleteTempError)
            return res.status(401).json({ error: deleteCatError?.message || deleteTempError?.message });

        return res.status(200).json({ status: "Category and associated templates removed successfully" });
    }
}