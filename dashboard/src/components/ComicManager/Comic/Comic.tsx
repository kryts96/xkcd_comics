import React from 'react'
import { IComic } from '../../../api/ComicApi/ComicType'
import { MonthUtils } from '../../../utils/MonthUtils'

type ComicProps = {
    comic: IComic,
}

const Comic: React.FC<ComicProps> = ({ comic }) => {
    const { day, month, year, num, alt, img, title } = comic
    return (
        <div>
            <div>#{num} {title}</div>
            <img src={img} alt={alt} />
            <div>{day} {MonthUtils[month]} {year}</div>
        </div>
    )
}

export default Comic