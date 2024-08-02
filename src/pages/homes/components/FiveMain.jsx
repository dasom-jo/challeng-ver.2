import fiveMain from "../css_module/FiveMain.module.css"
import fiveimg from "../images/seven_img.jpg"
const FiveMain = () => {
    return (
        <div>
            <img src={fiveimg} alt="남자가 앉아있는 이미지" className={fiveMain.StartImg}/>
            <box  className={fiveMain.StartBox}>
                <p>자 이제 챌린지지를 이해하셨나요?<br/>그럼 당장 도전하세요 당신의 새로운 미래를 위해</p>
            </box>
        </div>
    );
}

export default FiveMain;