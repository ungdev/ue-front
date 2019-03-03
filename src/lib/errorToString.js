export default error => {
  if(!error) return 'Une erreur est survenue'
  switch (error) {
    case 'INVALID_FORM':
      return 'Formulaire incomplet'
    case 'UNKNOWN':
      return 'Une erreur est survenue'
    case '':
      return 'Une erreur est survenue'
    default:
      return error
  }
}
