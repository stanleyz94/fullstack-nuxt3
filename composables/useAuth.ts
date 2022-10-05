import { v4 as uuidv4 } from 'uuid'
import { ISession } from '@/types/ISession'
import { IUser } from '@/types/IUser'
import { CreateUserInput } from '@/server/schema/userSchema'

export const useAuthCookie = () => useCookie('auth_token')

export const useUser = async (): Promise<IUser> => {
  const authCookie = useAuthCookie().value
  const user = useState<IUser>('user')

  if (authCookie && !user.value) {
    const { data } = await useFetch(`/api/auth/getByAuthToken`, {
      headers: useRequestHeaders(['cookie']),
    })
    user.value = data.value
  }
  return user.value
}

export const userLogout = async () => {
  await useFetch('/api/auth/logout')
  useState('user').value = null
  await useRouter().push('/')
}

export const registerWithEmail = async ({
  username,
  name,
  email,
  password,
}: CreateUserInput['data']) => {
  try {
    const fetchKey = ref(``)
    fetchKey.value = uuidv4()
    const { data, error } = await useFetch<ISession>('/api/auth/register', {
      method: 'POST',
      body: { data: { username, name, email, password } },
      key: fetchKey.value,
    })

    if (error.value) return

    if (data) {
      useState('user').value = data
      await useRouter().push('/dashboard')
    }
  } catch (e) {
    console.log('error: ' + e.toString())
  }
}

export const loginWithEmail = async (email: string, password: string) => {
  const user = await $fetch<IUser>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  })
  useState('user').value = user
  await useRouter().push('/dashboard')
}
