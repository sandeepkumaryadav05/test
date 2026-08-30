import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-cream-50">
      <div className="flex flex-col items-center gap-4">
        <span className="animate-float-slow">
          <Logo />
        </span>
        <span className="h-1 w-36 overflow-hidden rounded-full bg-sand">
          <span className="block h-full w-1/2 animate-[shimmer_1.2s_infinite] rounded-full bg-forest" style={{ animation: 'loadbar 1.1s ease-in-out infinite' }} />
        </span>
        <style>{`@keyframes loadbar{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}`}</style>
      </div>
    </div>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
