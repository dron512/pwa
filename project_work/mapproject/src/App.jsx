import { Route, Routes } from "react-router-dom";
import RootPage from "./pages/RootPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import Menu from "./components/Menu.jsx";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<RootPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
      </Routes>
      {/* city 데이터 변경시 자동으로 하위컴포넌트 호출 */}
    </>
  );
}

export default App;
