import style from "./Footer.module.css"

function Footer() {
  return (
    <footer>
      <div className={style.container_rodape}>
        <div className={style.descricao}>Design by - Lucas Deister</div>
        <a className={style.icones} href="https://www.instagram.com/lucasdeister7/" target="_blank" rel="noreferrer">
          <img src="/icones/icons8-instagram-32.png" alt="instagram" />
        </a>
        <a className={style.icones} href="mailto:lucasdeister7@hotmail.com" target="_blank" rel="noreferrer">
          <img src="/icones/icons8-mensagem-32.png" alt="instagram" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
