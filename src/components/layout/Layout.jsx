import { BrowserRouter } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer';
import Main from './Main';

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer/>
        </BrowserRouter>
    );
}

export default Layout;