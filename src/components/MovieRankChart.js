import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const MovieRankChart = ({chartData, targetDt}) => {

    React.useEffect(()=>{
        console.clear();
        console.group("MoveRankChart");
        console.debug(chartData);
        console.debug(targetDt);
        console.groupEnd();
    }, [chartData, targetDt]);
    //그래프 옵션
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: targetDt + '관람객 수 순위',
          },
        },
      };
      const data = {
        labels : chartData.movieNm,
        datasets: [
          {
            label: '관람객 수',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth : 1,
            data : chartData.audiCnt
          },
         
        ],
      };
    return (
        <Bar 
            data={data}
            options={options}
        />
    );
};

MovieRankChart.defaultProps = {
    chartData : {
        movieNm : [],
        audiCnt : []
    }
}
export default MovieRankChart;