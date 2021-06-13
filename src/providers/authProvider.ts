// in src/authProvider.js
import Cookie from 'js-cookie'
import { UserIdentity } from 'react-admin'
import { createContext } from 'react'
import api from '../services/api'

interface SignInCredentials {
  email?: string
  password?: string
  cpf?: string
  phone?: string
}

export interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  login(credentials: SignInCredentials): Promise<any>
  checkError({ message: string, status: number, body: Object }): Promise<void>
  checkAuth(): Promise<void>
  logout(): Promise<string | false | void>
  getIdentity(): Promise<UserIdentity>
  getPermissions(params: Object): Promise<void>
}

const authProvider: AuthContextData = {
  login: async ({ email, password, cpf, phone }: SignInCredentials) => {
    let response

    if (email && password) {
      response = await api.post('/sessions', {
        email: email,
        password: password
      })
    } else {
      response = await api.post('/sessions', { cpf: cpf, phone: phone })
    }

    const { token, user } = response.data

    Cookie.set('token', token)
    Cookie.set('user', JSON.stringify(user))
  },

  checkError: async error => {},

  checkAuth: async () => {
    return Cookie.get('token') ? Promise.resolve() : Promise.reject()
  },

  logout: async () => {
    Cookie.remove('token')
    Cookie.remove('user')
    Cookie.remove('bag')

    return
  },

  getIdentity: async () => {
    const user: User = JSON.parse(Cookie.get('user'))
    return { id: user.id }
  },

  getPermissions: async params => {
    return Cookie.get('token') ? Promise.resolve() : Promise.reject()
  }
}

export default authProvider
