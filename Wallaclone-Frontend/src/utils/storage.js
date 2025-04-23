const storage = {
  get(key) {
    const value = localStorage.getItem(key)
    if (!value) {
      return null
    }
  
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  },
  set(key, value) {
    const valueToStore =
    typeof value === 'object' ? JSON.stringify(value) : value
    localStorage.setItem(key, valueToStore)
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}

export const clearSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  //aqui se pueden añadir mas cosas que borrar mas adelante (userid de rober, por ejemplo)
}

export default storage
