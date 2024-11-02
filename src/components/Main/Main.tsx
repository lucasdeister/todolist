import { useContext, useEffect, useState } from "react";

import style from "./Main.module.css"

import BotaoPrincipal from "../BotaoPrincipal/BotaoPrincipal";
import Tabela from "../Tabela/Tabela";
import CustomModal from "../CustomModal/CustomModal";
import Cronometro from "../Cronometro/Cronometro";

import { ModalContext } from "../../context/ModalContext";
import { CronometroContext } from "../../context/CronometroContext";
import { UtilContext } from "../../context/UtilContext";

function Main() {

  const { modalState, setModalState, modalNome } = useContext(ModalContext);

  const { tempoRestante, setTempoRestante, cronometroAtivo,
    formatarTempo, tempoDecorrido, setTempoDecorrido, setCronometroAtivo
  } = useContext(CronometroContext);

  const { recuperarDados, tarefaEmExecucao,
    arrayTarefas, obterIdCorrespondente, setIdArrayTarefaExecutando,
    idArrayTarefaExecutando, tarefaExecutando, setTarefaExecutando,
    atualizarItemNoLocalStorage
  } = useContext(UtilContext);

  const columnsDesktop = ["Id", "Nome", "Status", "Início previsto", "Duração",
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

  useEffect(() => {
    recuperarDados();
  }, [recuperarDados]);


  useEffect(() => {

    const verificarTarefaEmExecucao = () => {
      const tarefaEmExecucao = arrayTarefas.filter((tarefa) => tarefa.status === "Executando");

      return tarefaEmExecucao.length > 0 ? tarefaEmExecucao[0] : null;
    };

    if (tarefaEmExecucao) {
      const tarefa = verificarTarefaEmExecucao();

      if (tarefa !== null) {
        const id_tarefa_executando = tarefa.id;
        const idCorrespondente = obterIdCorrespondente(id_tarefa_executando);
        setTarefaExecutando(tarefa);
        setIdArrayTarefaExecutando(idCorrespondente);
        setCronometroAtivo(true);
      }
    }

  }, [tarefaEmExecucao, arrayTarefas])

  useEffect(() => {

    if(tarefaExecutando){

      atualizarItemNoLocalStorage(idArrayTarefaExecutando,
        {
          tempo_restante: formatarTempo(tempoRestante),
          tempo_decorrido: formatarTempo(tempoDecorrido)
        });
    }

  }, [tarefaExecutando, arrayTarefas]);


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
        show={modalState} />
      <Cronometro
        tempoRestante={tempoRestante}
        setTempoRestante={setTempoRestante}
        tempoDecorrido={tempoDecorrido}
        setTempoDecorrido={setTempoDecorrido}
        cronometroAtivo={cronometroAtivo}
        formatarTempo={formatarTempo} />
      <Tabela columns={columns} data={arrayTarefas} isMobile={isMobile} />
    </main>
  )
}

export default Main;