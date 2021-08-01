import { ValidationError } from 'yup'

interface Errors {
  [key: string]: string
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {}

  err.inner.forEach(error => {
    const id = Date.now().toString()
    validationErrors[error?.path || id] = error.message
  })

  return validationErrors
}
