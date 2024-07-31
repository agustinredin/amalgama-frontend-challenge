import "./App.css";
import LoginScreen from "./LoginScreen";
import { ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  redirect,
} from "react-router-dom";
import MainScreen from "./MainScreen";

function App() {
  //lógica del token y punto 3.2 realizado después del límite de 2h
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      redirect('/main')
    }
  }, []);

  return (
    <ChakraProvider>
      <p className="desc-message">
        Amalgama Frontend Challenge - Agustin Redin
      </p>

      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/private" />
              ) : (
                <LoginScreen setToken={setToken} />
              )
            }
          />
          <Route
            path="/main"
            element={token ? <MainScreen token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/main" : "/login"} />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
