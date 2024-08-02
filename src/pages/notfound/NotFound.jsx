import Button from '@mui/material/Button';
import styles from './NotFoundCss.module.css'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return ( 
        <div className={styles.container}>
            <br/>
            <p>다시 한번 확인해 주세요!</p>
            <br/>
            <p>지금 입력하신 주소의 페이지는</p>
            <br/>
            <p>사라졌거나 다른 페이지로 변경되었습니다.</p>
            <br/>
            <p>주소를 다시 확인해주세요.</p>
            <br/>
            <Button variant="contained" onClick={()=>navigate('/')}>홈으로 가기</Button>
        </div>
    );
}

export default NotFound;