export default function formatDate(date: Date): string {
  const formatedDate = new Date(date)

  const day = `${formatedDate.getDate()}`.padStart(2, '0')
  const month = `${formatedDate.getMonth() + 1}`.padStart(2, '0')
  const year = formatedDate.getFullYear()

  return day + '/' + month + '/' + year
}
