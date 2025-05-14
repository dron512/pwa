import { useEffect, useState } from "react";
import { fetchCities } from "../api/supadb.js";
import { fetchAqi } from "../api/airapi.js";
import { Button, Drawer } from "antd";

import { Route, Routes, useNavigate } from "react-router-dom";
import RootPage from "./pages/RootPage.jsx";
import UserPage from "./pages/UserPage.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <div
        style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 100 }}
      >
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        title="메뉴입니다."
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div>
          <ul>
            <li>
              <Button
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                root
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  navigate("/user");
                  setOpen(false);
                }}
              >
                user
              </Button>
            </li>
            {/* <li>
              <Link to="/user">user</Link>
            </li> */}
          </ul>
        </div>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <Routes>
        <Route path="/" element={<RootPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
      </Routes>
      {/* city 데이터 변경시 자동으로 하위컴포넌트 호출 */}
    </>
  );
}

export default App;
