import React from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getList} from '../slices/MovieRankSlice';
import day from 'dayjs';

import Top from '../components/Top';
import MovieRankList from '../components/MovieRankList';
import MovieRankChart from '../components/MovieRankChart';

//로딩컴포넌트
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner';

import style from '../assets/scss/style.module.scss';


const MovieRankPage = () => {

    let {targetDt} = useParams();
    const {rt, rtmsg, data, loading} = useSelector((state)=>state.movieRank);
    const dispatch = useDispatch();

    if(!targetDt) {
        targetDt = day().add(-1, 'd').format('YYYY-MM-DD');
    }

    React.useEffect(()=>{
        console.clear();
        console.log(`React.useEffect = > ${targetDt}`);
        dispatch(getList(targetDt));
    }, [dispatch, targetDt]);

    return (
        <div>
            <Top targetDt={targetDt}/>
            {loading && (
                <TailSpin
                 color="#00BFFF" 
                 height={80} 
                 width={80}
                 wrapperStyle={{
                     position: 'absolute',
                     left : '50%',
                     top : '50%',
                     marginTop: '-50%',
                     marginLeft : '-50%'
                 }} 
                 />
            )}
            {rt !== 200 ? (
                <div className={style.errmsg}>
                    <h3>{rt} Error</h3>
                    <p>{rtmsg}</p>
                </div>
            ) : (
                <div>
                    <MovieRankChart chartData={data.chartData} targetDt={targetDt}/>
                    <MovieRankList boxOfficeResult={data.boxOfficeResult}/>
                </div>
            )}
        </div>
    );
};

export default MovieRankPage;