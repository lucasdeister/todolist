import style from "./Footer.module.css"

function Footer() {
  return (
    <footer className={`${style.container_rodape}`}>
      <div className={style.descricao}>Design by - Lucas Deister</div>
      <a href="https://www.instagram.com/lucasdeister7/" target="_blank" rel="noreferrer">
        <i id={style.instagram} className={`${style.icones} bi bi-instagram`}></i>
      </a>
      <a href="mailto:lucasdeister7@hotmail.com" target="_blank" rel="noreferrer">
        <i id={style.email} className={`${style.icones} bi bi-envelope`}></i>
      </a>
    </footer>
  );
}

export default Footer;