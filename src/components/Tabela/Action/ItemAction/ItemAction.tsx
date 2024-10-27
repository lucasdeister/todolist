// import CustomToast from "../../../CustomToast/CustomToast";

import { useContext, useEffect } from "react";
import { ModalContext } from "../../../../context/ModalContext";
import { CronometroContext } from "../../../../context/CronometroContext";

interface ItemActionProps {
    nome: string;
    nome_icone: string;
    id: number;
    tempo_restante: string;
}

function ItemAction({ nome, nome_icone, id, tempo_restante }: ItemActionProps) {

    const { tarefaEmExecucao, setTtarefaEmExecucao } = useContext(CronometroContext);

    const { setModalState, arrayTarefas, setModalNome } = useContext(ModalContext);

    const { setCampoNome, setCampoDuracao, setCampoPrazo, setCampoObservacoes } = useContext(ModalContext);

    const { setCampoNomeDisabled, setCampoDuracaoDisabled, setCampoPrazoDisabled } = useContext(ModalContext);

    const { habilitarCamposForm } = useContext(ModalContext);

    const { setIdTarefaEditada } = useContext(ModalContext);

    const { setDescricaoModalApagar } = useContext(ModalContext);
    
    const { setIdTarefaApagar } = useContext(ModalContext);

    const { recuperarDados } = useContext(ModalContext);

    const { setTempo, preencherTempoRestanteNoTitulo,
            setCronometroAtivo, tempo, formatarTempo} = useContext(CronometroContext);

    const { setBotaoExecutarDesativado, botaoExecutarDesativado } = useContext(CronometroContext);

    const obterIdCorrespondenteArray = (idTarefa: number): number => {

        const idArray = (tarefaArray: { id: number; }) => tarefaArray.id === idTarefa

        return arrayTarefas.findIndex(idArray);
    }

    const idTarefaArray = obterIdCorrespondenteArray(id);

    const exibirModalEdicao = (): void => {
        setIdTarefaEditada(id);
        const tarefaIniciada = arrayTarefas[idTarefaArray].status !== "A fazer";

        if (tarefaIniciada) {
            desabilitarCamposTarefasIniciadas(idTarefaArray);
        } else {
            habilitarCamposForm();
        }
        const tarefaEmProgresso = (arrayTarefas[idTarefaArray].status === "Executando"
            || arrayTarefas[idTarefaArray].status === "Pausada");

        if (tarefaEmProgresso) {
            setCampoPrazoDisabled(false);
        }

        preencherInformacoesTarefa(idTarefaArray);

        setModalNome("Editar");
        setModalState(true);

    }

    const preencherInformacoesTarefa = (idTarefaArray : number): void => {
        setCampoNome(arrayTarefas[idTarefaArray].nome)
        setCampoDuracao(arrayTarefas[idTarefaArray].duracao)
        setCampoPrazo(arrayTarefas[idTarefaArray].prazo)
        setCampoObservacoes(arrayTarefas[idTarefaArray].observacoes)
    }

    const desabilitarCampoNome = (): void => {
        setCampoNomeDisabled(true);
    }

    const desabilitarCampoDuracao = (): void => {
        setCampoDuracaoDisabled(true);
    }

    const desabilitarCampoPrazo = (): void => {
        setCampoPrazoDisabled(true);
    }


    const desabilitarCamposTarefasIniciadas = (idTarefaArray: number): void => {

        desabilitarCampoNome();
        desabilitarCampoDuracao();

        const tarefaEncerrada = (arrayTarefas[idTarefaArray].status === "Concluída"
            || arrayTarefas[idTarefaArray].status === "Cancelada");

        if (tarefaEncerrada) {
            desabilitarCampoPrazo();
        }
    }

    const exibirModalApagarTarefa = (): void => {
        setModalNome("Apagar");
        setModalState(true);
        setDescricaoModalApagar("da tarefa?");
        setIdTarefaApagar(id);
    }
    
    const identificarIdCorrespondente = (): number => {
        return arrayTarefas.findIndex((item: any) => item.id === id);
      }

    const colocarTarefaEmExecucao = (id: number): void =>{
        arrayTarefas[id].status = "Executando";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
      }
    
      const atualizaTempoRestante = (id: number): void => {
        arrayTarefas[id].tempo_restante = formatarTempo(tempo);
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        recuperarDados();
    };

    const executarTarefa = (id: number): void => {
        preencherTempoRestanteNoTitulo(tempo_restante);
        setCronometroAtivo(true);
        colocarTarefaEmExecucao(id);
        setTtarefaEmExecucao(true);
    }

    const verificarTarefaEmExecucao = (): any => {

        const tarefaEmExecucao = arrayTarefas.filter((tarefa) => tarefa.status === "Executando");
    
            if(tarefaEmExecucao.length > 0){
              return tarefaEmExecucao[0];
            }else{
              return null;
            }
      }

    useEffect(() => {
        if(tarefaEmExecucao){
            setBotaoExecutarDesativado(true);
        }else{
            setBotaoExecutarDesativado(false);
        }
    }, [tarefaEmExecucao]);


    const atualizarTarefaEmExecucao = (id: number): void => {

        const possuiTempoRestante = arrayTarefas[id].tempo_restante !== "00:00:00";

        if(possuiTempoRestante){
            atualizaTempoRestante(id);
        }
    }

    useEffect(() => {
        if(tarefaEmExecucao){
            const tarefa = verificarTarefaEmExecucao();
            if(tarefa){
                const id_correspondente = obterIdCorrespondenteArray(tarefa.id);
                atualizarTarefaEmExecucao(id_correspondente);
            }
        }
    }, [tempo, tarefaEmExecucao]);

    const pausarTarefa = (id: number): void => {
        setCronometroAtivo(false);
        setTtarefaEmExecucao(false);
        setBotaoExecutarDesativado(false);
        arrayTarefas[id].status = "Pausada";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
    }

    const concluirTarefa = (id: number): void => {
        setCronometroAtivo(false);
        setTtarefaEmExecucao(false);
        arrayTarefas[id].status = "Concluída";
        arrayTarefas[id].tempo_restante = "00:00:00";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        setTempo(0);
    }

    const cancelarTarefa = (id: number): void => {
        setCronometroAtivo(false);
        setTtarefaEmExecucao(false);
        arrayTarefas[id].status = "Cancelada";
        arrayTarefas[id].tempo_restante = "00:00:00";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        setTempo(0);
    }

    const executarOpcao = (): void => {
        const itemIndex = identificarIdCorrespondente();
        switch (nome) {
            case "Executar":
                executarTarefa(itemIndex);
                break;
            case "Editar":
                exibirModalEdicao();
                break;
            case "Apagar":
                exibirModalApagarTarefa();
                break;
            case "Pausar":
                pausarTarefa(itemIndex);
                break;
            case "Concluir":
                concluirTarefa(itemIndex);
                break;
            case "Cancelar":
                cancelarTarefa(itemIndex);
                break;
        }
    }

    return (
        <div>
            <li >
                <button
                    className="dropdown-item"
                    onClick={executarOpcao}
                    disabled={nome === 'Executar' && botaoExecutarDesativado}>
                    <i className={`bi bi-${nome_icone} me-2`}></i>
                    {nome}
                </button>
            </li>
        </div>
    )
}


export default ItemAction;