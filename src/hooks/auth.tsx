import { useContext, createContext, useCallback, useState } from 'react'
import Cookie from 'js-cookie'
import api from '../services/api'

interface SignInCredentials {
  email?: string
  password?: string
  cpf?: string
  phone?: string
}

interface SignUpCredentials {
  name: string
  email: string
  password: string
  phone: string
  cpf?: string
  cnpj?: string
}

export interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  signUp(credentials: SignUpCredentials): Promise<void>
}

interface AuthData {
  token: string
  user: User
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const token = Cookie.get('token')
    const user = Cookie.get('user')

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthData
  })

  const signIn = useCallback(
    async ({ email, password, cpf, phone }: SignInCredentials) => {
      let response

      if (email && password) {
        response = await api.post('/sessions', {
          email: email,
          password: password
        })
      } else {
        response = await api.post('/sessions', { cpf: cpf, phone: phone })
      }

      console.log(response)

      const { token, user } = response.data

      Cookie.set('token', token)
      Cookie.set('user', JSON.stringify(user))

      setData({ token, user })
    },
    []
  )

  const signOut = useCallback(() => {
    Cookie.remove('token')
    Cookie.remove('user')
    Cookie.remove('bag')

    setData({} as AuthData)
  }, [])

  const signUp = useCallback(
    async ({ email, password, cpf, phone, cnpj, name }: SignUpCredentials) => {
      if (cpf) {
        console.log({ email, password, cpf, phone, cnpj, name })
        await api
          .post('/users', {
            name: name,
            cpf: cpf,
            phone: phone,
            email: email,
            password: password
          })
          .then(() => signIn({ email: email, password: password }))
      } else {
        await api
          .post('/users', {
            name: name,
            cnpj: cnpj,
            phone: phone,
            email: email,
            password: password
          })
          .then(() => signIn({ email: email, password: password }))
      }
    },
    []
  )

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthPovider')
  }
  return context
}
