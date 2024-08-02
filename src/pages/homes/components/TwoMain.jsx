
import twoImg from "../images/app_image2.png"
import twoMain from '../css_module/TwoMain.module.css'

const TwoMain = () => {
    return (
        <div className={twoMain.twoImg}>
            <img src={twoImg} alt="다리운동하는 여성"/>
            <div>
                <h1>CHALLEN.GG(챌린지지)</h1>
                <div>
                    <p>패자의 뜻인 GG?! NO!</p>
                    <p>GG는 원래 good game이 줄임말입니다.</p>
                    <p>good game이라는 말을 패자가 하여 마치 진다는 뜻으로 와전되었지만
                    사실 승자를 인정하고 도전 자체를 즐기는 뜻입니다.</p>
                    <p>CHALLEN.GG(챌린지지)는 끊임없이 도전하고 성공과 실패를 겪으며 도파민을 충족하는 도전자들의
                    욕구를 채우기 위해 등장했습니다.</p>
                    <p>CHALLEN.GG(챌린지지)안에는 여러 도전자들이 만든 많은 도전과제로 가득하며 그안에서 서로의
                    성공과정을 보며 의지를 다잡을수있습니다.</p>
                    <p>우리는 수많은 도전을통해 정신과 신체에 건강을 불어넣으며 커뮤니티를 통해 같은 생각을 공유하는
                    사람들과 소통하고 소속감을 부여하여
                    갓생러들의 모습을 기대합니다.</p>
                </div>
            </div>
        </div>
    );
}

export default TwoMain;