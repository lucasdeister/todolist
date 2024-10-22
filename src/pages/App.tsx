import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header/Header"
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import styles from "./App.module.css"
import { ModalProvider } from '../context/ModalContext';
import { CronometroProvider } from '../context/CronometroContext';


function App() {
  return (
    <div className={styles.app}>
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
