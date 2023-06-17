import supabase from "@/utils/initSupabase";
import type { NextApiRequest, NextApiResponse } from "next";

const updateCategory = async (category_id: string, title: string, user_id: string) => {
    const { data, error } = await supabase
        .from("categories")
        .update({ category_name: title })
        .eq("category_id", category_id)
        .match({ user_id })
        .select()

    if (error) throw error;
    return data;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        try {
            const { category_id, title, userId } = req.body;
            //console.log("updateCategory", categoryId, title, userId)
            const data = await updateCategory(category_id, title, userId);
            console.log("catput response", data)
            if (!data) {
                res.status(500).json({ error: 'No data received from updateCategory' });
            } else {
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}