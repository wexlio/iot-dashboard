import "./App.css";
import DataSimulation from "./components/DataSimulation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import MostrarDatos from "./components/MostrarDatos";

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route exact path="/" element={<MostrarDatos />} />
          <Route exact path="/esp32" element={<DataSimulation />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
