import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h1>Home (em construção)</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;