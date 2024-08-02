import myButtons from "./css_module/Buttons.module.css"
import MadeChallenge from "../mypages/MadeChallenge";
import PurchaseList from "../mypages/PurchaseList";

const MyButtons = () => {
    return (
        <>
            <PurchaseList className={myButtons.Buttons1}/>
            <MadeChallenge className={myButtons.Buttons2}/>
        </>
    );
}

export default MyButtons;