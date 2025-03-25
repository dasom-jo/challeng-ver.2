import Header from "../../components/layout/Header";
import CommunityList from "./CommunityList";
import styles from "./css_module/Community.module.css";
import OneMain from "../homes/components/OneMain";
import { useNavigate } from "react-router-dom";
const Community = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <OneMain />
      <div className={styles.comtainerMain}>
        <div>
          <div
            onClick={() => {
              navigate("/");
            }}
            className={styles.communityText1}
          >
            challen.gg
          </div>
          <div className={styles.communityText2}>Community</div>
        </div>
        <div className={styles.CommunityContainer}>
          <CommunityList />
        </div>
        <div className={styles.header}>
          <Header />
        </div>
      </div>
    </div>
  );
};

export default Community;
