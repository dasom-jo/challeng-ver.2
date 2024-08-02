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
            <p className={oneMain.text}>챌린지지와<br/> 함께 새로운 도전이 시작된다</p>
        </div>
    );
}

export default OneMain;