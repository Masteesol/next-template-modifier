import supabase from '@/utils/initSupabase'

export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
        console.error('Error updating password: ', error);
        throw error;
    }

    console.log('Password updated successfully');
}