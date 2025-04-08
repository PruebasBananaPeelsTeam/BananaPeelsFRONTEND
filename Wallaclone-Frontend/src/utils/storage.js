const storage = {
  get(key) {
    const value = localStorage.getItem(key)
    if (!value) {
      return null
    }
    return value
  },
  set(key, value) {
    localStorage.setItem(key, value)
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}

export default storage
