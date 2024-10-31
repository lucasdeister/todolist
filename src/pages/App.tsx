import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header/Header"
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import { ModalProvider } from '../context/ModalContext';
import { CronometroProvider } from '../context/CronometroContext';
import { UtilProvider } from '../context/UtilContext';
import style from "./App.module.css"
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const checkAppVersion = () => {
      window.location.reload();
    };

    checkAppVersion();
  }, []);
  
  return (
    <div className={style.grid_container}>
      <Header/>
      <UtilProvider>
        <ModalProvider>
          <CronometroProvider>
            <Main/>
          </CronometroProvider>
        </ModalProvider>
      </UtilProvider>
      <Footer/>
    </div>
  );
}

export default App;
