import { useCallback, useContext, useEffect, useState } from "react";

import style from "./Main.module.css"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";
import Tabela from "../Tabela/Tabela";
import CustomModal from "../CustomModal/CustomModal";
import Cronometro from "../Cronometro/Cronometro";

import { ModalContext } from "../../context/ModalContext";
import { CronometroContext } from "../../context/CronometroContext";
import { UtilContext } from "../../context/UtilContext";

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
  const { tempoRestante, setTempoRestante, cronometroAtivo,
          formatarTempo, tempoDecorrido, setTempoDecorrido
        } = useContext(CronometroContext);
  const { verificouTarefaExecutando, setVerificouTarefaExecutando } = useContext(UtilContext);
  const { setCronometroAtivo } = useContext(CronometroContext);
  const { preencherTempoRestante, preencherTempoDecorrido } = useContext(CronometroContext);

  const continuarTarefaEmExecucao = useCallback((tarefa: any): void => {
    preencherTempoRestante(tarefa.tempo_restante);
    preencherTempoDecorrido(tarefa.tempo_decorrido);
    setCronometroAtivo(true);
    setTtarefaEmExecucao(true);
    setVerificouTarefaExecutando(false);
}, [preencherTempoRestante, preencherTempoDecorrido,
   setCronometroAtivo, setTtarefaEmExecucao, setVerificouTarefaExecutando]);

  useEffect(() => {
    recuperarDados();
    setVerificouTarefaExecutando(true);
  }, [setVerificouTarefaExecutando, recuperarDados]);


useEffect(() => {
  
  const verificarTarefaEmExecucao = () => {
      const tarefaEmExecucao = arrayTarefas.filter((tarefa) => tarefa.status === "Executando");

      return tarefaEmExecucao.length > 0 ? tarefaEmExecucao[0] : null;
  };

  if (verificouTarefaExecutando && arrayTarefas.length > 0) {
      const tarefa = verificarTarefaEmExecucao();
      if (tarefa) {
          continuarTarefaEmExecucao(tarefa);
      }
  }
}, [verificouTarefaExecutando, continuarTarefaEmExecucao, arrayTarefas]);

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
        <Cronometro
            tempoRestante={tempoRestante}
            setTempoRestante={setTempoRestante}
            tempoDecorrido={tempoDecorrido}
            setTempoDecorrido={setTempoDecorrido}
            cronometroAtivo={cronometroAtivo}
            formatarTempo={formatarTempo}/>
        <Tabela columns={columns} data={arrayTarefas} isMobile={isMobile} />
    </main>
  )
}

export default Main;