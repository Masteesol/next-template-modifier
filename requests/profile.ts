
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()

export const getSubTiers = async () => {
    //console.log(subscription_tier_id)
    try {
        const { data, error } = await supabase
            .from('subscription_tier')
            .select(`
            *
          `)
        if (data) {
            console.log(data)
            return data
        }
        if (error) {
            console.log(error)
        }
    } catch (error) {
        console.log("Erro fetching info", error)
    }
}

export const getUserInfo = async (userID: string) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select(`
          first_name,
          last_name,
          subscription_tier_id
        `)
            .eq('id', userID)
        if (data) {
            console.log(data)
            return data[0]
        }
        if (error) {
            console.log(error)
        }
    } catch (error) {
        console.log("Erro fetching info", error)
    }
}