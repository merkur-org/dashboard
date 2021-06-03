import { MutableRefObject } from 'react'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from './getValidationErrors'
import formMessages from '../styles/constants/formMessages'

interface registerProps {
  pessoal: boolean
  empresarial: boolean
  name: string
  email: string
  phone: string
  cpf?: string
  cnpj?: string
  password: string
  passwordConfirmation: string
  conditionTerms: boolean
}

const validateRegister = async (
  formData: registerProps,
  formRef: MutableRefObject<FormHandles>
): Promise<registerProps> => {
  formRef.current?.setErrors({})

  try {
    const schema = Yup.object().shape({
      pessoal: Yup.boolean(),
      empresarial: Yup.boolean(),
      name: Yup.string().required(formMessages.required),
      email: Yup.string().email().required(formMessages.required),
      phone: Yup.string().required(formMessages.required),
      cpf: Yup.string().when('pessoal', {
        is: true,
        then: Yup.string().required(formMessages.required)
      }),
      cnpj: Yup.string().when('empresarial', {
        is: true,
        then: Yup.string().required(formMessages.required)
      }),
      password: Yup.string()
        .required(formMessages.required)
        .matches(/(?=.{8,})/, 'A senha não atende as condições'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], formMessages.samePassword)
        .required(formMessages.required),
      conditionTerms: Yup.boolean().oneOf([true], formMessages.terms)
    })

    await schema.validate(formData, {
      abortEarly: false
    })
    return formData
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = getValidationErrors(error)

      formRef.current?.setErrors(errors)
    }
    return null
  }
}

export default validateRegister
