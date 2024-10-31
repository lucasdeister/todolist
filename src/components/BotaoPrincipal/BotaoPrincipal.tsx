import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { UtilContext } from "../../context/UtilContext";

interface BotaoPrincipalProps {
    texto: string;
    classe: string;
    handleShow?: () => void;
  }
  
function BotaoPrincipal({ texto, classe, handleShow }: BotaoPrincipalProps) {

    const { setModalNome, limparStates, habilitarCamposForm,
         setCampoPrazo, setDescricaoModalApagar } = useContext(ModalContext);

    const { setIdTarefaSelecionada, obterDiaAtual } = useContext(UtilContext);

    const exibirModalCriacao = () => {
        handleShow();
        limparStates();
        habilitarCamposForm();
        setModalNome("Criar");
        setCampoPrazo(obterDiaAtual())
    }

    const exibirModalApagar = () => {
        handleShow();
        setModalNome("Apagar");
        setIdTarefaSelecionada(0);
    }

    const handleOnClick = (): void =>{

        switch(texto) {
            case "Criar":
                exibirModalCriacao();
                break;
            case "Importar":
                console.log("Importar")
                break;
            case "Exportar":
                console.log("Exportar")
                break;
            case "Apagar":
                setDescricaoModalApagar("de todas as tarefas que estão a fazer?");
                exibirModalApagar();
                break;
        }

    } 

    return(
        <>
            <button 
                className={`btn btn-outline-${classe}
                btn-lg me-3 mb-3 text-dark`}
                onClick={handleOnClick}>{texto}
            </button>
        </>
    )
}


export default BotaoPrincipal;