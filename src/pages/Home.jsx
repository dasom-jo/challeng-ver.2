import styleHome from "../pages/homes/css_module/Home.module.css"
import Challenge from "../pages/homes/components/Challenge";
import Ranker from "../pages/homes/components/Ranker";
import Menufilter from "./homes/components/MenuFilter";
import { useState, useEffect } from "react";
import { challengApi } from "../api/services/challenge";
import { useAuth } from "../hooks/useAuth";
import OneMain from "./homes/components/OneMain";
import HomeMobile from "../pages/homes/css_module/Home.module.css"

const Home = () => {
    const { loginUser, kakaoLogin } = useAuth();
    const [sortKey, setSortKey] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [challengeList, setChallengeList] = useState([]);

    useEffect(() => {
        kakaoLogin();
    }, []);

    useEffect(() => {
        getChallenge(); // 페이지가 처음 렌더링될 때 챌린지 데이터를 가져옴
    }, [sortKey]);

    const getChallenge = async () => {
        try {
            const res = await challengApi.getChallenge();
            sortData(res.data.payload);
        } catch (err) {
            console.error(err);
        }
    };

    const sortData = (arr) => {
        let data;
        if (!sortKey || sortKey === "전체") setChallengeList(arr); // 필터가 없으면 전체 리스트 반환
        if (sortKey === "신규") {
            data = [...arr.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt)
            })];
            setChallengeList([...data]);
        }
        if (sortKey === "마감임박") {
            data = [...arr.sort((a, b) =>  new Date(a.startDay) - new Date(b.startDay) )];
            setChallengeList([...data]);
        }
        if (sortKey === "인기") {
            data = [...arr.sort((a, b) => new Date(b.number) - new Date(a.number))];
            setChallengeList([...data]);
        }
        if (sortKey === "관심") {
            setChallengeList(arr.filter(challenge => challenge.Interester.some(user => user.id === loginUser)));
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value); // 입력된 검색어를 상태에 저장
    };

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            // 검색어가 비어있으면 전체 리스트 보여주기
            getChallenge(); // 검색어가 없을 때는 전체 리스트를 다시 불러오기
        } else {
            // 검색어가 입력되면 해당 검색어를 기준으로 필터링
            const filteredList = challengeList.filter(challenge =>
                challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) // name을 기준으로 검색
            );
            setChallengeList(filteredList);
        }
    };
     //styleHeader.HeaderClass:헤더 전체
    //logo:challen.gg 로고


    return (
        <div className={styleHome.Home}>
            {/* 챌린지 메인 화면,주먹진여자 */}
            {/* <OneMain/> */}

            <div className={styleHome.HomeMobile}>
                <div>
                <Menufilter
                    sortKey={sortKey}
                    setSortKey={setSortKey}
                    handleSearchInputChange={handleSearchInputChange}
                    handleSearch={handleSearch}
                />
                </div>
                <div className={styleHome.challengeContainer}>
                    <Challenge challengeList={challengeList} />
                </div>
                <div>
                    <Ranker />
                </div>
            </div>
        </div>
    );
};

export default Home;

