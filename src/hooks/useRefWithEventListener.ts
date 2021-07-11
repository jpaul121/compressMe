import { useCallback, useRef } from 'react'

export function useRefWithEventListener(callback: (e: HTMLInputEvent) => void): [ (node: HTMLInputElement) => void ] {
  const ref = useRef<HTMLInputElement | null>(null)
  
  const setRef = useCallback((node: HTMLInputElement) => {
    if (ref.current) {
      ref.current.removeEventListener('change', callback)
    }
    
    if (node) {
      ref.current.addEventListener('change', callback)
    }

    ref.current = node
  }, [])

  return [ setRef ];
}
