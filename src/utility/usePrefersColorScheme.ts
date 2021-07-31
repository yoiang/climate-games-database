import { useEffect, useState } from 'react'

const createUsePrefersColorScheme = (scheme: string): (() => boolean) => {
  return (): boolean => {
    const [prefers, setPrefers] = useState<boolean>(false)

    const onChangePrefers = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setPrefers(true)
      } else {
        setPrefers(false)
      }
    }

    useEffect(() => {
      const prefersMedia = window.matchMedia(
        `(prefers-color-scheme: ${scheme})`
      )
      if (prefersMedia.matches) {
        setPrefers(true)
      } else {
        setPrefers(false)
      }
      prefersMedia.addEventListener('change', onChangePrefers)

      return () => {
        prefersMedia.removeEventListener('change', onChangePrefers)
      }
    }, [])

    return prefers
  }
}

export const usePrefersColorSchemeLight = createUsePrefersColorScheme('light')
export const usePrefersColorSchemeDark = createUsePrefersColorScheme('dark')
