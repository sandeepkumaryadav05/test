import { useEffect } from 'react'

export default function usePageMeta({ title, description, rawTitle } = {}) {
  useEffect(() => {
    if (rawTitle) document.title = rawTitle
    else if (title) document.title = `${title} | Devansh Dairy`
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
    window.scrollTo({ top: 0 })
  }, [title, description, rawTitle])
}
