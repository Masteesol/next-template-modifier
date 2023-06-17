import supabase from '@/utils/initSupabase'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { category_id, user_id } = req.body;

        // Check category owner
        const { data: category, error } = await supabase
            .from('categories')
            .select('user_id')
            .match({ id: category_id });

        if (error || !category || category[0].user_id !== user_id)
            return res.status(401).json({ error: error?.message || "Unauthorized" });

        // If the user is authorized, delete the category and associated templates
        const { error: deleteCatError } = await supabase
            .from('categories')
            .delete()
            .match({ id: category_id });

        const { error: deleteTempError } = await supabase
            .from('templates')
            .delete()
            .match({ category_id });

        if (deleteCatError || deleteTempError)
            return res.status(401).json({ error: deleteCatError?.message || deleteTempError?.message });

        return res.status(200).json({ status: "Category and associated templates removed successfully" });
    }
}