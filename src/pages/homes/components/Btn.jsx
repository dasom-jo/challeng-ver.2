import React from 'react';
import styles  from "../css_module/Btn.module.css"


const Btn = ({children,style, btnEvent}) => {
    return (
        <button onClick={btnEvent} style={style} className={`${styles.btn} ${styles['btn-open-line']}`}>
            {children}
        </button>
    );
}

export default Btn;