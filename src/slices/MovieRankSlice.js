import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

export const getList = createAsyncThunk("GET_LIST", async(payload, {rejectWithValue})=>{
    if(payload === undefined){
        payload = dayjs().add(-1, 'd').format('YYYYMMDD');
    }

    const targetDt = payload.replaceAll('-', '');
    let result = null;

    try {
        const date = dayjs().add(-1, 'd').format('YYYYMMDD');
        if(parseInt(targetDt) > parseInt(date)){
            const err = new Error();
            err.response = {status : 400, statusText : '조회 가능한 날짜는 하루 전 까지입니다.'};
            throw err;
        }
        const Url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"

        result = await axios.get(Url, {
            params : {
                key : 'da4074f8387339e2078a14dc346b4759',
                targetDt : targetDt
            }
        });
        
        if(result.data.faultInfo !== undefined){
            const err = new Error();
            err.response = {status : 500, statusText : result.data.faultInfo.message};
            throw err;
        }
    }catch(err){
        result = rejectWithValue(err.response);
    }

    return result;
});

//슬라이스 정의
export const movieRankSlice = createSlice({
    name : 'movieRank',
    initialState : {
        rt : null,
        rtmsg : null,
        item : [],
        loading : false
    },

    reducers : {},

    extraReducers : {
        [getList.pending] : (state, {payload})=>{
            return {
                ...state,
                loading : true
            }
        },
        [getList.fulfilled] : (state, {payload})=>{

            const chartData = {movieNm : [], audiCnt : []}
            payload.data.boxOfficeResult.dailyBoxOfficeList.forEach((v, i)=>{
                chartData.movieNm[i] = v.movieNm;
                chartData.audiCnt[i] = v.audiCnt;
            });

            payload.data.chartData = chartData;
            return {
                ...state,
                rt : payload.status,
                rtmsg : payload.statusText,
                data : payload.data,
                loading : false
            }
        },
        [getList.rejected] : (state, {payload})=>{
            return {
                ...state,
                rt : payload?.status ? payload.status : '500',
                rtmsg : payload?.statusText ? payload.statusText : 'Sever Error',
                loading : false
            }
        }
    }
});

export default movieRankSlice.reducer;