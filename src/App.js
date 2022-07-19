import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Meta from './components/Meta';
import MovieRankPage from './pages/MovieRankPage';
import style from './assets/scss/style.module.scss';

function App() {
  return (
    <div className={style.container}>
      <Meta />
      <Routes>
        <Route path='/' element={<MovieRankPage />} />
        <Route path='/:targetDt' element={<MovieRankPage />} />
      </Routes>
    </div>
  );
}

export default App;
