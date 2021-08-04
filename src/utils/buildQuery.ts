export const buildQuery = (query: Object) => {
  let queryStr: string = ''

  for (const prop in query) {
    if (query.hasOwnProperty(prop)) {
      queryStr += `&${prop}=${query[prop]}`
    }
  }

  return queryStr
}
