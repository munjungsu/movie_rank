import React from 'react';
import { useNavigate } from 'react-router-dom';
const Top = ({targetDt}) => {
    const navigate = useNavigate();

    const onDateChange = (e) =>{
        e.preventDefault();
        navigate('/' + e.currentTarget.value);
    };
    return (
        <header>
            <h1>영화진흥위원회 박스오피스</h1>
            <hr/>
            <form>
                <input type="date" className='form-control' placeholder="날짜선택" defaultValue={targetDt} onChange={onDateChange} />
                <label>조회날짜를 선택하세요</label>
            </form>
        </header>
    );
};

export default Top;