import { useAuth } from "../../../hooks/useAuth";
import Btn from "./Btn";
import menuFilter from "../css_module/MenuFilter.module.css"
import { useEffect, useState } from "react";

const Menufilter = ({setSortKey,handleSearchInputChange,handleSearch}) => {
    const { loginUser } = useAuth();

    const handleFilterClick = (filterMenu) => {
        setSortKey(filterMenu);
    };

    const [adText, setAdText] = useState();
    const TextList = [
        '오늘의 챌린지 추천!',
        "하늘 봉사단에서 멤버모집",
        '베스트첼린저 랭킹 변동!',
        '다이어트에 좋은 챌린지추천',
        '트래킹챌린지 출시'
    ]

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    useEffect(() => {
        const randomIndex = getRandomInt(TextList.length);
        const selectedAdText = TextList[randomIndex];
        setAdText(selectedAdText);
    }, []);
    return (
        <>
            <div className={menuFilter.btn}>
                {/* 그냥 전체 나열 */}
                <Btn btnEvent={()=>handleFilterClick('전체')}>전체</Btn>
                {/* createdAt 최근순 */}
                <Btn btnEvent={()=>handleFilterClick('신규')}>신규</Btn>
                {/* startDay가 현재날짜와 가장 가까운순 */}
                <Btn btnEvent={()=>handleFilterClick('마감임박')}>마감임박</Btn>
                {/* max최대인원수가 가장 적게 남은 사람 */}
                <Btn btnEvent={()=>handleFilterClick('인기')}>인기</Btn>
                {/* 로그인한 사용자가 좋아요한 리스트 */}
                {loginUser && <Btn btnEvent={() => handleFilterClick('관심')}>관심</Btn>}
                {/* 제목을 기준으로 */}

                <div className={menuFilter.inputWrapper}>
                    <input
                        type="text"
                        onChange={handleSearchInputChange}
                        className={menuFilter.menuInput}
                        placeholder={adText}
                    />
                    <Btn btnEvent={handleSearch} className={menuFilter.menuFilterBtn}>
                        &lt;검색/&gt;
                    </Btn>
                </div>
            </div>
        </>
    );
}

export default Menufilter;