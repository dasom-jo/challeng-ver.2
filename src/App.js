import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Community from "./pages/community/Community";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { LoginContext } from "./contexts/LoginContext";
import { useProvideAuth } from "./hooks/useProvideAuth";
import CommunityPost from './pages/community/CommunityPost';


import NotFound from "./pages/notfound/NotFound";



function App() {
  const auth = useProvideAuth();
  return (
    <LoginContext.Provider value={auth}>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/community' element={<Community/>} />
          <Route path='/communitypost/:title' element={<CommunityPost/>} />
          <Route path='/mypage' element={<MyPage/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Layout>
    </LoginContext.Provider>

  );
}

export default App;
