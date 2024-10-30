// import CustomToast from "../../../CustomToast/CustomToast";

import { useContext, useEffect } from "react";
import { ModalContext } from "../../../../context/ModalContext";
import { CronometroContext } from "../../../../context/CronometroContext";
import { UtilContext } from "../../../../context/UtilContext";

interface ItemActionProps {
    nome: string;
    nome_icone: string;
    id: number;
    tempo_restante: string;
    tempo_decorrido: string;
}

function ItemAction({ nome, nome_icone, id, tempo_restante, tempo_decorrido }: ItemActionProps) {

    const { tarefaEmExecucao, setTtarefaEmExecucao } = useContext(UtilContext);

    const { setModalState, setModalNome } = useContext(ModalContext);
    const { arrayTarefas } = useContext(UtilContext);

    const { setCampoNome, setCampoDuracao, setCampoPrazo, setCampoObservacoes } = useContext(ModalContext);

    const { setCampoNomeDisabled, setCampoDuracaoDisabled, setCampoPrazoDisabled } = useContext(ModalContext);

    const { habilitarCamposForm } = useContext(ModalContext);

    const { setIdTarefaSelecionada } = useContext(UtilContext);

    const { setDescricaoModalApagar } = useContext(ModalContext);

    const { recuperarDados, obterIdCorrespondente } = useContext(UtilContext);

    const { setTempoRestante, preencherTempoRestante,
            setCronometroAtivo, tempoRestante, formatarTempo,
            tempoDecorrido, setTempoDecorrido, preencherTempoDecorrido} = useContext(CronometroContext);

    const { setBotaoExecutarDesativado, botaoExecutarDesativado } = useContext(CronometroContext);

    const idTarefaArray = obterIdCorrespondente(id);

    const exibirModalEdicao = (): void => {
        setIdTarefaSelecionada(id);
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
        setIdTarefaSelecionada(id);
    }
    
    const colocarTarefaEmExecucao = (id: number): void =>{
        arrayTarefas[id].status = "Executando";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
      }
    
  

    useEffect(() => {
        if(tarefaEmExecucao){
            setBotaoExecutarDesativado(true);
        }else{
            setBotaoExecutarDesativado(false);
        }
    }, [tarefaEmExecucao, setBotaoExecutarDesativado]);


    useEffect(() => {

        const atualizaTempoRestante = (id: number): void => {
            arrayTarefas[id].tempo_restante = formatarTempo(tempoRestante);
        };
    
        const atualizaTempoDecorrido = (id: number): void => {
            arrayTarefas[id].tempo_decorrido = formatarTempo(tempoDecorrido);
        };

        const verificarTarefaEmExecucao = (): any => {

            const tarefaEmExecucao = arrayTarefas.filter((tarefa) => tarefa.status === "Executando");
        
                if(tarefaEmExecucao.length > 0){
                  return tarefaEmExecucao[0];
                }else{
                  return null;
                }
          }

          const atualizarTarefaEmExecucao = (id: number): void => {
            const possuiTempoRestante = arrayTarefas[id].tempo_restante !== "00:00:00";
    
            if(possuiTempoRestante){
                atualizaTempoRestante(id);
            }
            atualizaTempoDecorrido(id);
        }

        if(tarefaEmExecucao){
            const tarefa = verificarTarefaEmExecucao();
            if(tarefa){
                const id_correspondente = obterIdCorrespondente(tarefa.id);
                atualizarTarefaEmExecucao(id_correspondente);
                localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
                recuperarDados();
            }
        }
    }, [tempoRestante, tarefaEmExecucao, tempoDecorrido,
        recuperarDados, formatarTempo]);

    const executarTarefa = (id: number): void => {
        preencherTempoDecorrido(tempo_decorrido);
        preencherTempoRestante(tempo_restante);
        setCronometroAtivo(true);
        setTtarefaEmExecucao(true);
        colocarTarefaEmExecucao(id);
    }

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
        setTempoRestante(0);
        setTempoDecorrido(0);
    }

    const cancelarTarefa = (id: number): void => {
        setCronometroAtivo(false);
        setTtarefaEmExecucao(false);
        arrayTarefas[id].status = "Cancelada";
        arrayTarefas[id].tempo_restante = "00:00:00";
        localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
        setTempoRestante(0);
        setTempoDecorrido(0);
    }

    const executarOpcao = (): void => {
        const itemIndex = obterIdCorrespondente(id);
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