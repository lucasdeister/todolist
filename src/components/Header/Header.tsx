import styles from "./Header.module.css";

function Header(){
    return(
        <header className={styles.container_header}>
            <h1>Tarefas</h1>
        </header>
    )
}

export default Header;
