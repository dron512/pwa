import { Route, Routes } from "react-router-dom";
import RootPage from "./pages/RootPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import Menu from "./components/Menu.jsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: "BCRUQ5WPVsJ5r2mmTedv_VtZE6L3XMJ9ZOFWtzBAvmpKzvpe5W_LHPt5jr8-qq6TZlCXwcSFbMm0xY0cPBzsutk",
          })
          .then((subscription) => {
            return fetch("https://port-0-testmainbranch-m913h1zh8f5530cc.sel4.cloudtype.app/subscribe", {
              method: "POST",
              body: JSON.stringify(subscription),
              headers: {
                "Content-Type": "application/json",
              },
            });
          })
          .catch((error) => {
            console.error("푸시 구독 실패:", error);
          });
      });
    }
  }, []);

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
