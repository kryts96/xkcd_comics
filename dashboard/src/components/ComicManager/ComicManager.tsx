import { useCallback, useEffect, useState } from 'react'
import { getComic } from '../../api/ComicApi/ComicApi'
import { IComic } from '../../api/ComicApi/ComicType'
import Comic from './Comic/Comic'

const ComicManager = () => {
  const [comic, setComic] = useState<IComic>({} as IComic)
  const [comicNumber, setComicNumber] = useState<{ maxComicNumber?: number, currentComicNumber?: number }>({})

  const comicFetch = (wantComicNumber?: number) => {
    getComic(wantComicNumber).then(({ data }) => {
      if (data.Success) {
        setComic(data.Response)
        if (!comicNumber?.maxComicNumber) {
          setComicNumber({ currentComicNumber: data.Response.num, maxComicNumber: data.Response.num })
        } else {
          setComicNumber((currentComic) => ({ ...currentComic, currentComicNumber: data.Response.num }))
        }
      }
    })
  }
  useEffect(() => {
    comicFetch()
  }, [])

  const getAdjacentComics = (wantNext = false): void => {
    const curr_comicNumber = { ...comicNumber }
    let { currentComicNumber } = curr_comicNumber
    if (currentComicNumber) {
      if (wantNext) {
        currentComicNumber++
      } else {
        currentComicNumber--
      }
      comicFetch(currentComicNumber)
    }
  }

  const renderComic = (): JSX.Element => {
    if (!Object.keys(comic).length) {
      return <></>
    }
    return <Comic comic={comic} hasNext={(comicNumber.currentComicNumber || 0) < (comicNumber?.maxComicNumber || 0)} getAdjComics={getAdjacentComics} />
  }
  return renderComic()

}
export default ComicManager