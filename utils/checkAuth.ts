import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Cookies from 'js-cookie'

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

export const forceLogout = () => {
    Cookies.remove("email");
    Cookies.remove("user_id")
    Cookies.remove("authenticated")
    window.location.replace("/")
}