export const translatePaymentType = (type: string): string => {
  switch (type) {
    case 'credit_card':
      return 'Cartão de crédito'

    case 'money':
      return 'Dinheiro'

    case 'pix':
      return 'Pix'

    case 'bank_slip':
      return 'Boleto Bancário'

    case 'bank_transfer':
      return 'Transferência Bancária'

    default:
      return null
  }
}
