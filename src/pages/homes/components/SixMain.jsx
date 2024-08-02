import siximg from "../images/iPhone-app.png"
import sixMain from "../css_module/SixMain.module.css"
const SixMain = () => {
    return (
        <div className={sixMain.develop}>
            <div className={sixMain.develop1}>
                <h1 className={sixMain.developText}>백엔드가 전합니다</h1>
                <p>
                    <p style={{fontWeight:"bold"}}>
                    &lt;김우진 백엔드개발자/&gt;</p>
                    여기서 여러분은 다양한 건강 챌린지에 참여하며 새로운 건강한 삶을 시작하실 수 있습니다.
                    꾸준한 도전과 성취를 통해 여러분의 생활 습관을 긍정적으로 변화시키고, 건강한 몸과 마음을 만들어 나가세요.
                    뿐만 아니라, 여러분의 소중한 운동 꿀팁과 경험을 많은 사람들과 나눌 수 있는 공간도 마련되어 있습니다.
                    여러분의 공유와 소통이 더 많은 사람들에게 동기부여가 될 것입니다.
                    우리와 함께 건강한 삶을 만들어가는 여정에 동참해보세요. 여러분의 건강한 삶을 진심으로 응원합니다!
                </p>
                <br/>
                <p>
                <p style={{fontWeight:"bold"}}>
                    &lt;박석원 백엔드개발자/&gt;</p>
                    "Hello I'm Seokwon. 저희 개발팀은 CHALLEN.GG를 통해 여러분이 더 쉽게 운동을 계획하고, 동기부여를 받고, 목표를 달성할 수 있기를 바랍니다.
                    Without me. 저는 여러분의 건강에 별로 관심이 없기 때문에, 저희 앱을 추천드리지 않도록 하겠습니다.
                    Because... 저희 앱을 이용하신다면 건강해지는 건 당연하기 때문입니다. 설마 여기까지 읽는 사람이 있겠어?
                    Anyway, 저 같은 경우는 개발에 열중한 나머지 머리를 자를 시간이 없어 어느새 앞머리가 콧구멍까지 내려왔습니다.
                    추천하지는 않겠지만 이용해주신다면 감사하겠습니다. Thank you"
                </p>
            </div>
            <img src={siximg} className={sixMain.develop2} alt="두남녀가 서로 등을 맞대고 서있는 이미지"/>
            <div className={sixMain.develop3}>
                <h1 >프론트가 전합니다</h1>
                <p>
                <p style={{fontWeight:"bold"}}>
                    &lt;차민성 프론트개발자/&gt;</p>
                    안녕하세요! 쇼핑몰을 담당한 차민성 개발자입니다.
                    쇼핑몰에선 여러분의 도전에 도움이 될만한 물품을 많이 판매하고있습니다.
                    도전도 좋지만 안전도전하세요!!
                </p>
                <br/>
                <p>
                <p style={{fontWeight:"bold"}}>
                    &lt;김진영 프론트개발자/&gt;</p>
                    "안녕하세요, CHALLEN.GG 개발팀에서 커뮤니티 페이지를 담당한 김진영 개발자입니다
                    커뮤니케이션이 챌린지지의 영혼이라고 볼수있는데요. 여기서 같은 관심사를 가진 사람들과
                    대화하며 감정을 교류하세요
                </p>
                <br/>
                <p>
                <p style={{fontWeight:"bold"}}>
                    &lt;조다솜 프론트개발자/&gt;</p>
                    안녕하세요 CHALLEN.GG 개발팀의 조다솜개발자입니다.
                    저는 메인페이지와 마이페이지를 담당했는데요. 메인페이지에선 챌린지의 정체성과 많은 챌린지를
                    사용자의 입장에서 편리하게 보여주기위해 최선을 다했으며 많은 피드백을 환영합니다
                    마이페이지는 챌린지지의 가장중요한 핵심기능이라고 생각되는데요 나의 개인정보와 진행중인 챌린지
                    그리고 칼로리를 기록하고 챌린지를 내가 개설할수있는 칸이 마련되있습니다.
                    이곳에서 자신의 도전을 기록하세요!!
                </p>
            </div>
        </div>
    );
}

export default SixMain;