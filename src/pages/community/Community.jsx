import CommunityList from "./CommunityList";
import styles from './css_module/Community.module.css'

const Community = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.upperImg}>
                <div className={styles.communityText}>Community</div>
            </div>
            <div className={styles.CommunityContainer}>
                <CommunityList/>
            </div>
        </div>
    );
}

export default Community;