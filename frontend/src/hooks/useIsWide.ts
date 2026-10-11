/**
 * 화면 폭이 기준(1024px) 이상인지 알려주는 훅
 * resize와 달리 matchMedia의 change는 기준을 넘나드는 순간에만 호출됨
 */

// hooks
import { useEffect, useState } from 'react'

const WIDE_QUERY = '(min-width: 1024px)'

function useIsWide() {
  const [isWide, setIsWide] = useState(() => window.matchMedia(WIDE_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY)

    function handleChange(e: MediaQueryListEvent) {
      setIsWide(e.matches)
    }

    mq.addEventListener('change', handleChange)
    return () => {
      mq.removeEventListener('change', handleChange)
    }
  }, [])

  return isWide
}

export default useIsWide
