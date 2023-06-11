import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";

import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;
