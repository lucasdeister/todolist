import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

interface BotaoPrincipalProps {
    texto: string;
    classe: string;
    handleShow?: () => void;
  }
  
function BotaoPrincipal({ texto, classe, handleShow }: BotaoPrincipalProps) {

    const { setModalNome, limparStates, habilitarCamposForm, setCampoPrazo } = useContext(ModalContext);

    const { setDescricaoModalApagar, setIdTarefaApagar } = useContext(ModalContext);

    const exibirModalCriacao = () => {
        handleShow();
        limparStates();
        habilitarCamposForm();
        setModalNome("Criar");
        setCampoPrazo(obterDiaAtual())
    }
    
    const obterDiaAtual = (): string => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
        const dia = dataAtual.getDate().toString().padStart(2, '0');
        
        return `${ano}-${mes}-${dia}`;
      };

    const exibirModalApagar = () => {
        handleShow();
        setModalNome("Apagar");
        setIdTarefaApagar(0);
    }

    const handleOnClick = (): void =>{

        switch(texto) {
            case "Criar Tarefa":
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