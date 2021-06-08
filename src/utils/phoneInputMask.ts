export default function phoneInputMask(value: string): string {
  let v = value
  v = value.replace(/\D/g, '')
  v = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  return v
}
