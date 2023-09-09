import React from 'react'
import { IComic } from '../../../api/ComicApi/ComicType'
import { MonthUtils } from '../../../utils/MonthUtils'

import styles from "./comic.module.scss"

type ComicProps = {
    comic: IComic,
    hasNext?: boolean,
    getAdjComics: (wantNext?: boolean) => void
}

const Comic: React.FC<ComicProps> = ({ comic, hasNext, getAdjComics }) => {
    const { day, month, year, num, alt, img, title } = comic
    return (
        <div>
            <div>xkcd.com Comic #{num}</div>
            <div>{title}</div>
            <div className={styles.comicContainerDiv}>
                <div className={styles.chevronStyle} onClick={() => getAdjComics(false)}>{`<`}</div>
                <div><img src={img} alt={alt} /></div>
                <div className={hasNext ? styles.chevronStyle : styles.disabledChevronStyle} onClick={() => getAdjComics(true)}>{`>`}</div>
            </div>
            <div>{day} {MonthUtils[month]} {year}</div>
        </div>
    )
}

export default Comic