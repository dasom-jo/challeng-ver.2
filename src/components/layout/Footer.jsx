import styleFooter from "../css_module/Footer.module.css"


const Footer = () => {
    return (
        <div className={styleFooter.Footer}>
            <div className={styleFooter.Text}>
                이용약관 | 개인정보처리방침 | 책임의 한계와 법적고지 | 회원정보 고객
            </div>
            <br />
            <div className={styleFooter.Text}>
                Copyright © CHALLEN.GG Corp. All Rights Reserved.
            </div>
        </div>
    );
}

export default Footer;