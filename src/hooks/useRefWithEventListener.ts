import React, { useCallback, useRef } from 'react'

export function useRefWithEventListener(callback: (e: HTMLInputEvent) => void): [ React.MutableRefObject<HTMLInputElement>, (node: HTMLInputElement) => void ] {
  const refObject = useRef<HTMLInputElement | null>(null)
  
  const setRef = useCallback((node: HTMLInputElement) => {
    if (refObject.current) {
      refObject.current.removeEventListener('change', callback)
    }
    
    refObject.current = node
    
    if (node) {
      refObject.current.addEventListener('change', callback)
    }
  }, [])

  return [ refObject, setRef ];
}
