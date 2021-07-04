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
