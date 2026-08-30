import { useState } from 'react'
import { fallbackImage } from '../utils/images'

export default function SmartImage({ src, alt = '', className = '', ...rest }) {
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)

  if (!src) {
    return (
      <img
        src={fallbackImage(alt || 'Devansh')}
        alt={alt}
        className={className}
        {...rest}
      />
    )
  }

  return (
    <img
      src={failed ? fallbackImage(alt || 'Devansh') : current}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (!failed) {
          console.warn(`SmartImage: failed to load "${src}", using fallback for "${alt}"`)
          setFailed(true)
          setCurrent(fallbackImage(alt || 'Devansh'))
        }
      }}
      className={className}
      {...rest}
    />
  )
}
