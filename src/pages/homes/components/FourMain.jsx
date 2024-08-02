import fourMain from "../css_module/FourMain.module.css"

const FourMain = () => {
    return (
        <div className={fourMain.level}>
            <div>
                <h1 className={fourMain.LevelTitle}>5단계 레벨</h1>
            </div>
            <div>
                <p className={fourMain.LevelText}>1.스타터: 신규가입자및 챌린지 4회이하 챌린저</p>
                <p className={fourMain.LevelText}>2.엔돌핀: 5회 이상 8회미만 귀요미 챌린저</p>
                <p className={fourMain.LevelText}>3.에너지: 8회이상 13회미만 프로챌린저의 태가 나는 챌린저</p>
                <p className={fourMain.LevelText}>4.엔돌핀: 13회이상 21회미만 세미프로 챌린저</p>
                <p className={fourMain.LevelText}>5.카이저: 21회이상 프로 챌린저이자 챌린지지가 인정한 갓생러</p>
            </div>
        </div>
    );
}

export default FourMain;