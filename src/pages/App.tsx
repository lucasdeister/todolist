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
      // Obtenha a versão atual do HTML
      const currentVersion = document.querySelector('meta[name="app-version"]')?.getAttribute('content');

      // Obtenha a última versão salva no localStorage
      const savedVersion = localStorage.getItem('appVersion');

      // Se a versão mudou, limpe o cache e atualize a página
      if (currentVersion && currentVersion !== savedVersion) {
        localStorage.setItem('appVersion', currentVersion);
        window.location.reload(); // Recarrega ignorando o cache
      }
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
