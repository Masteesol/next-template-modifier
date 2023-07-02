import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

const checkSession = async () => {
    const { data } = await supabase.auth.getSession()
    //console.log(data)
    if (data.session?.access_token) {
        return data
    } else {
        return false
    }
}
export default checkSession