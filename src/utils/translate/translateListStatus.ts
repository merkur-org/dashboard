export const translateListStatus = (type: string): string => {
  switch (type) {
    case 'created':
      return 'Criado'

    case 'available':
      return 'Disponível'

    case 'unavailable':
      return 'Indisponível'

    default:
      return null
  }
}
