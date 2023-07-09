// pages/api/auth/deleteUser.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const key = process.env.SUPABASE_SERVICE_ROLE_KEY as string

const supabase = createClient(url, key, {
    auth: {
        persistSession: false
    }
})
export default async function handler(req: any, res: any) {
    const { userID } = req.body
    console.log("UserID", userID)
    try {
        // Delete user from 'categories'
        await supabase
            .from('categories')
            .delete()
            .eq('user_id', userID)

        // Delete user from 'templates'
        await supabase
            .from('templates')
            .delete()
            .eq('user_id', userID)

        // Delete user from 'users'
        await supabase
            .from('users')
            .delete()
            .eq('id', userID)

        const { data, error } = await supabase.auth.admin.deleteUser(userID)

        if (data) {
            console.log("User deleted:", data)
            res.status(200).json({ data: data })
        }
        if (error) {
            console.log("Error deleting user:", error)
            res.status(500).json({ error: error.message })
        }
    } catch (error) {
        console.log("Error deleting user:", error)
        res.status(500).json({ error: error })
    }
}
