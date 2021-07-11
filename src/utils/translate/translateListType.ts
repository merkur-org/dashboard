export const translateListType = (type: string): string => {
  switch (type) {
    case 'offer':
      return 'Oferta'

    case 'producer':
      return 'Produtor'

    default:
      return null
  }
}
