import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import ReservarSala from "./pages/ReservarSala";
import MinhasReservas from "./pages/MinhasReservas";
import Admin from "./pages/Admin";
import RotaProtegida from "./components/RotaProtegida";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/reservar/:salaId" element={<ReservarSala />} />
          <Route path="/minhas-reservas" element={<MinhasReservas />} />
          <Route
  path="/admin"
  element={
    <RotaProtegida apenasAdmin>
      <Admin />
    </RotaProtegida>
  }
/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;