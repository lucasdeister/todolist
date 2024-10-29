import style from "./Main.module.css"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";

import Tabela from "../Tabela/Tabela";
import CustomModal from "../CustomModal/CustomModal";

import Cronometro from "../Cronometro/Cronometro";

import { ModalContext } from "../../context/ModalContext";
import { CronometroContext } from "../../context/CronometroContext";
import { UtilContext } from "../../context/UtilContext";

import { useContext, useEffect, useState } from "react";

function Main() {

  const columnsDesktop = ["Id", "Nome", "Status", "Duração",
    "Tempo restante", "Tempo decorrido", "Realizar até", "Ações"];
  const columnsMobile = ["Id", "Nome", "Status", "Ações"];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const columns = isMobile ? columnsMobile : columnsDesktop;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

  const { modalState, setModalState, modalNome } = useContext(ModalContext);
  const { recuperarDados, arrayTarefas, setTtarefaEmExecucao } = useContext(UtilContext);
  const { tempo, setTempo, cronometroAtivo, formatarTempo } = useContext(CronometroContext);
  const { verificouTarefaExecutando, setVerificouTarefaExecutando } = useContext(UtilContext);
  const { setCronometroAtivo } = useContext(CronometroContext);
  const { preencherTempoRestanteNoTitulo } = useContext(CronometroContext);

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
      setVerificouTarefaExecutando(false);
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
        continuarTarefaEmExecucao(tarefa);
      }
    }

  }, [verificouTarefaExecutando,
     continuarTarefaEmExecucao, identificarIdCorrespondente,
     verificarTarefaEmExecucao, arrayTarefas]);

  return (
    <main className={style.container_main}>
      <hr className="m-5" />
      <div className={style.container_botoes_principais}>
        <BotaoPrincipal texto="Criar" classe="success" handleShow={() => setModalState(true)} />
        <BotaoPrincipal texto="Importar" classe="info" />
        <BotaoPrincipal texto="Exportar" classe="secondary" />
        <BotaoPrincipal texto="Relatório" classe="warning" />
        <BotaoPrincipal texto="Apagar" classe="danger" handleShow={() => setModalState(true)} />
      </div>
      <CustomModal
          nome_modal={modalNome + " Tarefa"}
          atualizarGrid={recuperarDados}
          handleClose={() => setModalState(false)}
          show={modalState}/>
        <Cronometro tempo={tempo} setTempo={setTempo} cronometroAtivo={cronometroAtivo} formatarTempo={formatarTempo}/>
        <Tabela columns={columns} data={arrayTarefas} isMobile={isMobile} />
    </main>
  )
}

export default Main;