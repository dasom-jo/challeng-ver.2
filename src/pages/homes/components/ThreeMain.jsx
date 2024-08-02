import threeimg from"../images/five.png"
import threeMain from "../css_module/ThreeMain.module.css"
const ThreeMain = () => {
    return (
        <div className={threeMain.menu}>
            <h1 className={ threeMain.menufirstText}> 페이지별 소개</h1>
            <div className={ threeMain.menuText}>
                <div>
                    <h2>&lt;메인페이지/&gt;</h2>
                    <p>챌린지지의 소개및 수많은챌린지,오늘의 프로챌린저를 확인하세요</p>
                </div>
                <div>
                    <h2>&lt;커뮤니티/&gt;</h2>
                    <p>같은 챌린지나 비슷한 관심사를 공유하는 사람과 소통해보세요</p>
                </div>
                <div>
                    <h2>&lt;쇼핑몰/&gt;</h2>
                    <p>운동은 장비발! 안전을 위해 운동제품을 구매하는건 어떠세요?</p>
                </div>
                <div>
                    <h2>&lt;마이페이지/&gt;</h2>
                    <p>나의레벨,포인트,팔로워와 진행중인 챌린지를 한눈에 확인가능합니다
                        <br/>다이어트는 식이! 매일 칼로리를 기록하세요
                    </p>
                </div>
            </div>
            <div >
                <img src={threeimg}  className={ threeMain.menuImg}/>
            </div>
        </div>
    );
}

export default ThreeMain;