import { useAuth } from "../../../hooks/useAuth";
import Btn from "./Btn";

const Menufilter = ({ setSortKey }) => {
  const { loginUser } = useAuth();

  const handleFilterClick = (filterMenu) => {
    setSortKey(filterMenu);
  };
  return (
    <>
      <div
        style={{ width: "425px", display: "flex", justifyContent: "center" }}
      >
        {/* createdAt 최근순 */}
        <Btn btnEvent={() => handleFilterClick("신규")}>신규</Btn>
        {/* startDay가 현재날짜와 가장 가까운순 */}
        <Btn btnEvent={() => handleFilterClick("마감임박")}>마감임박</Btn>
        {/* max최대인원수가 가장 적게 남은 사람 */}
        <Btn btnEvent={() => handleFilterClick("인기")}>인기</Btn>
        {/* 로그인한 사용자가 좋아요한 리스트 */}
        {loginUser && (
          <Btn btnEvent={() => handleFilterClick("관심")}>관심</Btn>
        )}
        {/* 제목을 기준으로 */}
      </div>
    </>
  );
};

export default Menufilter;
