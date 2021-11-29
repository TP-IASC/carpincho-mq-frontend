import { Outlet } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";

function App() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  );
}

export default App;
