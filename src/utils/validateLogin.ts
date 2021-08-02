import { MutableRefObject } from 'react'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from './getValidationErrors'
import formMessages from '../styles/constants/formMessages'

interface loginProps {
  cpfTab: boolean
  emailTab: boolean
  email?: string
  password?: string
  phone?: string
  cpf?: string
}

const validateLogin = async (
  formData: loginProps,
  formRef: MutableRefObject<FormHandles>
): Promise<Omit<loginProps, 'emailTab' | 'cpfTab'>> => {
  formRef.current?.setErrors({})

  try {
    const schema = Yup.object().shape({
      emailTab: Yup.boolean(),
      cpfTab: Yup.boolean(),
      email: Yup.string()
        .email(formMessages.validEmail)
        .when('emailTab', {
          is: true,
          then: Yup.string().required(formMessages.required)
        }),
      password: Yup.string().when('emailTab', {
        is: true,
        then: Yup.string().required(formMessages.required)
      }),
      cpf: Yup.string().when('cpfTab', {
        is: true,
        then: Yup.string().required(formMessages.required)
      }),
      phone: Yup.string().when('cpfTab', {
        is: true,
        then: Yup.string().required(formMessages.required)
      })
    })
    await schema.validate(formData, {
      abortEarly: false
    })

    let data
    if (formData.emailTab) {
      data = {
        email: formData.email || '',
        password: formData.password || ''
      }
    } else {
      data = {
        phone: formData.phone || '',
        cpf: formData.cpf || ''
      }
    }

    return data
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = getValidationErrors(error)

      formRef.current?.setErrors(errors)
    }
    return {}
  }
}

export default validateLogin
