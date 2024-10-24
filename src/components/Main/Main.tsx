import style from "./Main.module.css"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";

import Tabela from "../Tabela/Tabela";
import CustomModal from "../CustomModal/CustomModal";

import Cronometro from "../Cronometro/Cronometro";

import { ModalContext } from "../../context/ModalContext";
import { CronometroContext } from "../../context/CronometroContext";

import { useContext, useEffect } from "react";

const columns = ["Id", "Nome", "Status", "Duração",
                 "Tempo restante", "Tempo decorrido",
                  "Realizar até", "Ações"]

function Main() {

  const { recuperarDados, arrayTarefas, modalState, setModalState, modalNome } = useContext(ModalContext);
  const { tempo, setTempo, ativo, formatarTempo } = useContext(CronometroContext);

  const { verificouTarefaExecutando, setVerificouTarefaExecutando } = useContext(ModalContext);

  const { setCronometroAtivo, setIdAcao } = useContext(CronometroContext);

  const { setTtarefaEmExecucao, preencherTempoRestanteNoTitulo } = useContext(CronometroContext);

  const verificarTarefaEmExecucao = (): any => {

    const tarefaEmExecucao = arrayTarefas.filter((tarefa) => tarefa.status === "Executando");

        if(tarefaEmExecucao.length > 0){
          return tarefaEmExecucao[0];
        }else{
          return null;
        }
  }

  const continuarTarefaEmExecucao = (tarefa: any): void => {
      preencherTempoRestanteNoTitulo(tarefa.tempo_restante);
      setCronometroAtivo(true);
      setTtarefaEmExecucao(true);
  }

  useEffect(() => {
    recuperarDados();
    setVerificouTarefaExecutando(true);
  }, [setVerificouTarefaExecutando]);


  const identificarIdCorrespondente = (id: number): number => {
    return arrayTarefas.findIndex((item: any) => item.id === id);
  }

  useEffect(() => {

    if(verificouTarefaExecutando && arrayTarefas.length > 0){
      const tarefa = verificarTarefaEmExecucao();
      if(tarefa){
        const id_tarefa_array = identificarIdCorrespondente(tarefa.id)
        setIdAcao(id_tarefa_array);
        continuarTarefaEmExecucao(tarefa);
      }
    }

  }, [verificouTarefaExecutando,
     continuarTarefaEmExecucao, identificarIdCorrespondente,
     verificarTarefaEmExecucao, setIdAcao, arrayTarefas]);

  return (
    <main className="container">
      <hr className="m-5" />
      <div className={style.container_botoes_principais}>
        <BotaoPrincipal texto={"Criar Tarefa"} classe="success" handleShow={() => setModalState(true)} />
        <CustomModal
          nome_modal={modalNome + " Tarefa"}
          atualizarGrid={recuperarDados}
          handleClose={() => setModalState(false)}
          show={modalState}/>
        <BotaoPrincipal texto="Importar" classe="info" />
        <BotaoPrincipal texto="Exportar" classe="secondary" />
        <BotaoPrincipal texto="Relatório" classe="warning" />
        <BotaoPrincipal texto="Apagar" classe="danger" handleShow={() => setModalState(true)} />
      </div>
        <Cronometro tempo={tempo} setTempo={setTempo} ativo={ativo} formatarTempo={formatarTempo}/>
        <Tabela columns={columns} data={arrayTarefas} />
    </main>
  )
}

export default Main;