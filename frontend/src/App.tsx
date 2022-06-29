import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from 'pages/Upload';
import Pacientes from 'pages/Pacientes';

// uso de react router dom para mudança de pags
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Pacientes />} />
        <Route path="/paciente">
          <Route path=":idPaciente" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;