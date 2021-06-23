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

export const translatePaymentStatus = (type: string): string => {
  switch (type) {
    case 'processing':
      return 'Processando'

    case 'awaiting_payment':
      return 'Aguardando pagamento'

    case 'canceled':
      return 'Cancelado'

    case 'expired':
      return 'Expirado'

    case 'paid':
      return 'Pago'

    default:
      return null
  }
}

export const translateSalesType = (type: string): string => {
  switch (type) {
    case 'wholesale':
      return 'Atacado'

    case 'retail':
      return 'Varejo'

    default:
      return null
  }
}
