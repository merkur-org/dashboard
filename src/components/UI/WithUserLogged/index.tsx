import { useHistory } from 'react-router-dom'
import { ElementType, useEffect } from 'react'
import Cookie from 'js-cookie'

// impedir que o usuário entre em páginas caso ele esteja logado
// EX: página de login e cadastro
const WithUserLogged = (Component: ElementType) => {
  const Wrapper = (props: any) => {
    const history = useHistory()

    useEffect(() => {
      const token = Cookie.get('token')

      if (token) {
        history.push('/login')
      }
    }, [])

    return <Component {...props} />
  }

  return Wrapper
}

export default WithUserLogged
