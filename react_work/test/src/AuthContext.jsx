// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 최초 로그인 유지 여부 확인
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password, nick) => {
    const data = { email, nick, password };
    axios.defaults.withCredentials = true;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
      console.log(res);
      if (res.data && res.data.user) {
        // Only set the user object, not the entire response
        const userData = {
          id: res.data.user.id,
          email: res.data.user.email,
          nick: res.data.user.nick,
          provider: res.data.user.provider,
          snsId: res.data.user.snsId
        };
        setUser(userData);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 사용 훅
export const useAuth = () => useContext(AuthContext);
