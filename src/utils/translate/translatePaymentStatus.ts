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
