import React from 'react';
import { useNavigate } from 'react-router-dom';
import myButtons from "./css_module/Buttons.module.css";

const PurchaseList = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/shoppingpurchase');
    }

    return (
        <div>
            <button className={myButtons.PurchaseList} onClick={handleNavigate}>구매목록</button>
        </div>
    );
}

export default PurchaseList;