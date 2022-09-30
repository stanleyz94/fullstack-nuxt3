import { ISession } from "@/types/ISession"
import { IUser } from "@/types/IUser"
import { FormValidation } from '@/types/FormValidation'
import { ZodErrorMap } from "zod"

export const useAuthCookie = () => useCookie('auth_token')


export async function useUser(): Promise<IUser> {
    const authCookie = useAuthCookie().value
    const user = useState<IUser>('user')
    
    if (authCookie && !user.value) {
        const { data } = await useFetch(`/api/auth/getByAuthToken`, {
            headers: useRequestHeaders(['cookie'])
        })
        user.value = data.value
    }
    return user.value
}

export async function userLogout() {
    await useFetch('/api/auth/logout')
    useState('user').value = null
    await useRouter().push('/')
}


export async function registerWithEmail(
    username: string,
    name: string,
    email: string,
    password: string,
    fetchKey: string,
  ): Promise<string> {
    try {
      const { data, error } = await useFetch<ISession>('/api/auth/register', {
        method: 'POST',
        body: { data: { username, name, email, password } },
        key: fetchKey,
      })
      console.log({ username, data })
      console.log({ error: error.value })
      if (error.value) {
        // console.log('error.value', { error: error.value })
        // type ErrorData = {
        //   data: ErrorData
        // }
  
        const errorData = error.value
        const errors = errorData.data.data
        console.log({ errors })
        const formatErrorResponse = (error: ZodErrorMap) => {
          return Object.fromEntries(
            Object.entries(error).map(([key, value]) => [`$${key}`, value])
          )
        }
        const formattedErrors = errors.map(formatErrorResponse)
        console.log(formattedErrors)
        // const res = JSON.parse(errors)
        // const errorMap = new Map<string, { check: InputValidation }>(
        //   Object.entries(res)
        // )
  
        return formattedErrors
      }
  
      if (data) {
        useState('user').value = data
        await useRouter().push('/dashboard')
      }
    } catch (e) {
      console.log('error: ' + e.toString())
    }
  }
  

export async function loginWithEmail(email: string, password: string) {
    const user = await $fetch<IUser>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
    })
    useState('user').value =  user
    useRouter().push('/dashboard')

}