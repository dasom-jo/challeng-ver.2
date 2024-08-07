import { BrowserRouter } from 'react-router-dom';
import Header from "./Header";
import Main from './Main';

const Layout = ({ children }) => {
    return (
        <BrowserRouter>

            <Main>
                {children}
            </Main>
        <Header />
        </BrowserRouter>
    );
}

export default Layout;