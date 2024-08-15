import React from 'react';
import oneimg from "../images/header_bg.jpg"
import styleHome from "../css_module/Home.module.css"
import oneMain from "../css_module/OneMain.module.css"

const OneMain = () => {
    return (
        <div>
            <img
                src={oneimg}
                alt="여성이 주먹을 쥐고노려보는 이미지"
                className={oneMain.girlImg}/>
        </div>
    );
}

export default OneMain;