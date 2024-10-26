import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header/Header"
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import { ModalProvider } from '../context/ModalContext';
import { CronometroProvider } from '../context/CronometroContext';
import style from "./App.module.css"

function App() {
  return (
    <div className={style.grid_container}>
      <Header/>
      <ModalProvider>
        <CronometroProvider>
          <Main/>
        </CronometroProvider>
      </ModalProvider>
      <Footer/>
    </div>
  );
}

export default App;
