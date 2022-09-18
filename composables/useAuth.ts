import { ISession } from "@/types/ISession"
import { IUser } from "@/types/IUser"

export const useAuthCookie = () => useCookie('auth_token')


export async function useUser(): Promise<IUser> {
    const authCookie = useAuthCookie().value
    const user = useState<IUser>('user')
    
    if (authCookie && !user.value) {
        const { data } = await useFetch(`/api/auth/getByAuthToken`, {
            headers: useRequestHeaders(['cookie'])
        })
    }
}

export async function registerWithEmail(username: string, name: string, email: string, password: string) {
    try {
        const res = await $fetch<ISession>('/api/auth/register', {
            method: 'POST',
            body: { username, name, email, password },
        })

        if (res) {
            useState('user').value = res
            await useRouter().push('/dashboard')
        }
    } catch(e) {
        console.log('error: ' + e.toString())
    }
}