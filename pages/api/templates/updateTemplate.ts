import supabase from "@/utils/initSupabase";
import type { NextApiRequest, NextApiResponse } from "next";

const updateTemplate = async (
    template_id: string,
    title: string,
    text: string,
    user_id: string
) => {
    const { data, error } = await supabase
        .from("templates")
        .update({ title, text })
        .eq("template_id", template_id)
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
            const { template_id, title, text, user_id } = req.body;
            //console.log("updateTemplates", templateId, title, text, user_id)
            const data = await updateTemplate(template_id, title, text, user_id);
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