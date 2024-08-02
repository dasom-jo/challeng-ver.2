import  Styles  from "../pages/mypages/css_module/MyPage.module.css"
import { Box } from "@material-ui/core";
import mainimg from "../images/main.jpg"
import MyInfo from "./mypages/MyInfo";

const MyPage = () => {
    return (
    <Box className={Styles.Container}>
        <img
            src={mainimg}
            alt="한가로운 골목"
            className={Styles.mainImg}
        />
        <p className={Styles.mainText}>MY PAGE</p>
        <MyInfo/>
    </Box>
    );
}

export default MyPage;