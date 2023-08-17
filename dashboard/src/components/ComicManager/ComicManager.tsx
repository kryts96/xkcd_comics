import { useCallback, useEffect, useState } from 'react'
import { getComic } from '../../api/ComicApi/ComicApi'
import { IComic } from '../../api/ComicApi/ComicType'
import Comic from './Comic/Comic'


const ComicManager = () => {
  const [comic, setComic] = useState<IComic>({} as IComic)

  const comicFetch = useCallback(() => {
    getComic().then(({ data }) => {
      if (data.Success) {
        setComic(data.Response)
      }
    })
  }, [])

  useEffect(() => {
    comicFetch()
  }, [])

  const renderComic = () => {
    if (!Object.keys(comic).length) {
      return null
    }
    return <><Comic comic={comic} /></>
  }

  return renderComic()
}

export default ComicManager