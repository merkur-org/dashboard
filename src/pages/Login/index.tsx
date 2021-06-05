import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useLogin } from 'react-admin'

import validateLogin from '../../utils/validateLogin'
import phoneInputMask from '../../utils/phoneInputMask'
import { useAuth } from '../../hooks/auth'

import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import TabMenu from '../../components/UI/TabMenu'
import ModalMessage from '../../components/UI/ModalMessages'

import { FaCheck } from 'react-icons/fa'
import {
  Container,
  BackgroundOrange,
  BackgroundWhiteRectangle,
  WelcomeContainer,
  FormContainer,
  InputContainer,
  ButtonContainer,
  LinksContainer
} from './styles'
import WithUserLogged from '../../components/UI/WithUserLogged'

interface formProps {
  cpfTab: boolean
  emailTab: boolean
  email?: string
  senha?: string
  telefone?: string
  cpf?: string
}

const Login: React.FC = () => {
  const login = useLogin()
  const history = useHistory()

  const [emailSelected, setEmailSelected] = useState(true)
  const [cpfSelected, setCpfSelected] = useState(false)
  const [errors, setErrors] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setErrors(undefined)
  }, [emailSelected, cpfSelected])

  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(async (formData: formProps) => {
    try {
      const data = await validateLogin(formData, formRef) // validar o formulário
      if (data) {
        setIsLoading(true)

        await login(data)
        history.push('/')
      }
    } catch (err) {
      formRef.current.setErrors(err)
      setErrors(err)

      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <Container isLoading={isLoading}>
        <BackgroundWhiteRectangle>
          <WelcomeContainer>
            <h1>BEM VINDO</h1>
            <h2>Informe seus dados para iniciar a sessão</h2>
          </WelcomeContainer>
          <FormContainer>
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{
                emailTab: true,
                cpfTab: false,
                email: '',
                senha: '',
                cpf: '',
                telefone: ''
              }}
            >
              <TabMenu
                buttons={[
                  {
                    name: 'emailTab',
                    label: 'email e senha',
                    isSelected: emailSelected,
                    setIsSelected: setEmailSelected
                  },
                  {
                    name: 'cpfTab',
                    label: 'cpf e telefone',
                    isSelected: cpfSelected,
                    setIsSelected: setCpfSelected
                  }
                ]}
              />
              {emailSelected && (
                <>
                  <InputContainer>
                    <Input name="email" type="email" label="Email" />
                  </InputContainer>
                  <Input
                    name="password"
                    type="password"
                    label="Senha"
                    subLabel="esqueceu sua senha"
                  />
                  <LinksContainer>
                    <a href="forgotPassword">esqueceu sua senha?</a>
                    <a href="noRegister">não possui cadastro?</a>
                  </LinksContainer>
                </>
              )}

              {cpfSelected && (
                <>
                  <InputContainer>
                    <Input name="cpf" type="text" label="CPF" />
                  </InputContainer>
                  <Input
                    name="phone"
                    type="string"
                    label="Telefone"
                    mask={phoneInputMask}
                  />
                </>
              )}
              <ButtonContainer>
                <Button text="Iniciar sessão" icon={FaCheck} type="submit" />
              </ButtonContainer>
            </Form>
          </FormContainer>
        </BackgroundWhiteRectangle>
        <BackgroundOrange />
      </Container>
      {errors && (
        <ModalMessage
          message="Ocorreu um erro tente novamente"
          type="error"
          open={errors}
        />
      )}
    </>
  )
}

export default Login
