import { useEffect } from 'react'

/* ANTES
 useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [error])
*/

export default function useTimer(condition, callback, delay = 5000) {
  useEffect(() => {
    if (!condition) return
    const timer = setTimeout(callback, delay)
    return () => clearTimeout(timer)
  }, [condition, callback, delay])
}
