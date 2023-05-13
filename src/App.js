import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import AlertMessage from "./components/AlertMessage/AlertMessage";

function App() {
  return (
    <BrowserRouter>
        <AlertMessage />
        <NavBar />
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;
