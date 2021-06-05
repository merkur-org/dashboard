import { useHistory } from 'react-router-dom'
import { ElementType, useEffect } from 'react'
import Cookie from 'js-cookie'

// impedir que o usuário entre em rotas caso ele NÃO esteja logado
// EX: Página de finalização de compra
const WithAuth = (Component: ElementType): React.FC => {
  const Wrapper = (props: any) => {
    const history = useHistory()

    useEffect(() => {
      const token = Cookie.get('token')

      if (!token) {
        console.log(history)
        history.push('/')
      }
    }, [])

    return <Component {...props} />
  }

  return Wrapper
}

export default WithAuth
