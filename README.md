# chart.js로 박스오피스 영화순위 조회하기

### 프로젝트 구조
```
public
│ 
src ── assets ── style.module.scss
├── components
│   ├── Meta.js
│   ├── MovieRankChart.js
│   ├── MovieRankList.js
│   └── Top.js
├── pages
│   └── MovieRankPage.js 
├── slices
│   └── MovieRankSlice.js
├── App.js
├── store.js
└── index.js
```
### 슬라이스 정의 및 axios로 데이터 가져오기
##### 데이터 요청
AsyncThunk 비동기로 데이터 가져오기
parmas로 apiKey,targetDt(날짜값) 보내기
```
export const getList = createAsyncThunk("GET_LIST", async(payload, {rejectWithValue})=>{
   
    const targetDt = payload.replaceAll('-', '');
    let result = null;
  
   //만약 payload값이 없다면 어제날짜를 기본값으로 설정
  
    if(payload === undefined){
        payload = dayjs().add(-1, 'd').format('YYYYMMDD');
    }
   
   try {
        
       
        const Url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"

        result = await axios.get(Url, {
            params : {
                key : 'da4074f8387339e2078a14dc346b4759',
                targetDt : targetDt
            }
        });
    }catch(err){
        result = rejectWithValue(err.response);
    }

    return result;
});
```
##### 슬라이스 정의
```
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
       [getList.pending], [getList.fulfilled], [getList.rejected]
       ...생략
    }
});
```
#### 스토어
```

//슬라이스에서 정의한 name속성을 등록

const logger = createLogger();
const store = configureStore({
   
    reducer: {
        
        movieRank : MovieRankSlice,
    },    
   
    
    });
    export default store;
```
#### MovieRankPage
"react-redux" useSelector를 이용하여 리덕스 스토어에 저장된 상태값 연결 -> 슬라이스에서 정의한 액션함수를 dispatch -> MovieRankList.js에 데이터 보내기
```
리덕스 스토어에 저장된 상태값 연결
const {rt, rtmsg, data, loading} = useSelector((state)=>state.movieRank);

```
```

액션함수 호출(dispatch)
React.useEffect(()=>{
        
        dispatch(getList(targetDt));
    }, [dispatch, targetDt]);

```
```
MovieRankList.js에 데이터 보내기 및 데이터 출력

<MovieRankList boxOfficeResult={data.boxOfficeResult}/>
```

### MovieRankChart
MovieRankSlice.js에서 데이터를 받을때 chart.js에 보낼 데이터를 새로운 배열에 담아서 받아오기 -> MovieRankChart.js에 props로 전달
```
//영화이름,관객수를 새로운 배열에 담아서 받기

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
```
```
//chartData props로 전달 및 chart.js 그래프 출력

<MovieRankChart chartData={data.chartData} targetDt={targetDt}/>
```