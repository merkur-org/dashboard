import { useState, useEffect } from 'react'
import { useRecordContext, TextFieldProps } from 'react-admin'
import Cookie from 'js-cookie'

import api from '../../../services/api'

import { IUserDTO } from '../../../dtos/IUserDTO'

const UserField: React.FC<TextFieldProps> = props => {
  const record = useRecordContext(props)
  const [user, setUser] = useState('')

  useEffect(() => {
    async function getUser() {
      const token = Cookie.get('token')

      const { data } = await api.get<IUserDTO>(`/users/${record.user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setUser(data.name)
    }

    getUser()
  }, [record])

  return <p>{user}</p>
}

export default UserField
