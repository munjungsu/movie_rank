import React from 'react';
import style from '../assets/scss/style.module.scss';
const MovieRankList = ({boxOfficeResult}) => {
    return (
        <table className={style.table}>
            <thead>
                <tr>
                    <th className={style.textCenter}>순위</th>
                    <th className={style.textCenter}>제목</th>
                    <th className={style.textCenter}>관람객수</th>
                    <th className={style.textCenter}>매출액</th>
                    <th className={style.textCenter}>누적 관람객</th>
                    <th className={style.textCenter}>누적 매출액</th>
                </tr>
            </thead>
            <tbody>
                {boxOfficeResult.dailyBoxOfficeList.map((item, index) => (
                    <tr key={index}>
                        <td className={style.textCenter}>{item.rank}</td>
                        <td className={style.textCenter}>{item.movieNm}</td>
                        <td className={style.textRight}>{Number(item.audiCnt).toLocaleString()}명</td>
                        <td className={style.textRight}>{Number(item.salesAmt).toLocaleString()}원</td>
                        <td className={style.textRight}>{Number(item.audiAcc).toLocaleString()}명</td>
                        <td className={style.textRight}>{Number(item.salesAcc).toLocaleString()}원</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

MovieRankList.defaultProps = {
    boxOfficeResult : {
        dailyBoxOfficeList : []
    }
}

export default MovieRankList;