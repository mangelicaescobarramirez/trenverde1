import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsuarioLogin from "./pages/UsuarioLogin";
import RegistroUsuario from "./pages/RegistroUsuario.jsx";
import LoginAdm from "./pages/AdmLogin";
import RegisterAdministracion from "./pages/RegisterAdministracion";
import Maqueta from "./pages/maqueta";
import  Profileadm  from "./pages/Profileadm.jsx"; 
import  Profileuser  from "./pages/Profileuser.jsx"; 
import  Tasksformadm  from "./pages/taskformadm.jsx"; 
import  Taskspageadm  from "./pages/taskpageadm.jsx"; 
import  Taskspageuser  from "./pages/taskpageuser.jsx"; 
import  Tasksformuser  from "./pages/taskformuser.jsx"; 
import ProtecterRoute from "./ProtecterRoute.jsx";
import ProtecterRoute1 from "./ProtecterRoute1.jsx";
import  {AuthProvider}  from "./context/Autchcontext.jsx";
import  {TaskProvider}  from "./context/TasksContext.jsx";
import AccesoriosPage from "./pages/accesorio.jsx"
import AgregarPlantas from "./pages/agregarplantas.jsx"

import UserCrud from "./pages/UserCrud.jsx"

function App() {
  return (
    <AuthProvider>
     <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginAdm" element={<LoginAdm />} />
          <Route path="/UsuarioLogin" element={<UsuarioLogin />} />
          <Route path="/Registroadm" element={<RegisterAdministracion />} />
          <Route path="/registrousuario" element={<RegistroUsuario />} />
          <Route path="/maqueta" element={<Maqueta />} />
          <Route path="/Profileadm" element={<Profileadm />} />
            <Route path="/tasksformadm/:id" element={<Tasksformadm />} />
            <Route path="/tasksformadm" element={<Tasksformadm />} />
            <Route path="/taskspageadm" element={<Taskspageadm />} />
            <Route path="/accesorio" element={<AccesoriosPage />} />
            <Route path="/agregarplanta" element={<AgregarPlantas />} />
            


            <Route path="/Profileuser" element={<Profileuser />} />
            <Route path="/tasksformuser/:id" element={<Tasksformuser />} />
            <Route path="/tasksformuser" element={<Tasksformuser />} />
            <Route path="/taskspageuser" element={<Taskspageuser />} />
            <Route path="/usercrud" element={<UserCrud />} />
          
          <Route element={<ProtecterRoute />}>
        
          </Route>
          
          <Route element={<ProtecterRoute1 />}>
        
          </Route>
        </Routes>
      </BrowserRouter>
     </TaskProvider>
    </AuthProvider>
  );
}

export default App;
