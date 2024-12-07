import { createContext, useState, useContext, ReactNode, useCallback } from "react";

interface Tarefa {
  data_execucao: string;
  inicio: string;
  id: number;
  nome: string;
  prazo: string;
  status: string;
  duracao: string;
  tempo_restante: string;
  tempo_decorrido: string;
  observacoes: string;
}

interface UtilContextProps {
  idTarefaSelecionada: number;
  arrayTarefas: Tarefa[];
  tarefaExecutando: Tarefa[];
  tituloToast: string;
  descricaoToast: string;
  tarefaEmExecucao: boolean;
  idArrayTarefaExecutando: number;
  obteveDados: boolean;
  recuperarDados: () => void;
  setIdTarefaSelecionada: (id_tarefa: number) => void;
  setTituloToast: (titulo_toast: string) => void;
  setDescricaoToast: (descricao_toast: string) => void;
  setTarefaEmExecucao: (tarefaEmExecucao: boolean) => void;
  obterIdCorrespondente: (id: number) => number;
  obterDiaAtual: () => string;
  setIdArrayTarefaExecutando: (idArrayTarefaExecutando: number) => void;
  validouCamposObrigatorios: (nome: string, prazo: string,
  duracao_horas: number, duracao_minutos: number) => boolean;
  setTarefaExecutando: (tarefa: any) => void;
  atualizarItemNoLocalStorage: (id: number, novasInformacoes: Partial<Tarefa>) => void;
  setObteveDados: (obteve_dados: boolean) => void;
  verificarTarefaEmExecucao: () => any;
  definirTarefaEmExecucao: (tarefa: any) => void;
}

// Criando o contexto com tipo adequado
export const UtilContext = createContext<UtilContextProps | undefined>(undefined);

// Definindo as props para o UtilProvider
interface UtilProviderProps {
  children: ReactNode;
}

export const UtilProvider = ({ children }: UtilProviderProps) => {

  const [idArrayTarefaExecutando, setIdArrayTarefaExecutando] = useState<number>(0);
  const [tarefaExecutando, setTarefaExecutando] = useState<Tarefa[]>();

  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState<number>(0);

  const [tituloToast, setTituloToast] = useState<string>("");
  const [descricaoToast, setDescricaoToast] = useState<string>("");

  const [tarefaEmExecucao, setTarefaEmExecucao] = useState<boolean>(false);

  const [obteveDados, setObteveDados] = useState<boolean>(false);

  // Estado para armazenar as tarefas
  const [arrayTarefas, setArrayTarefas] = useState<Tarefa[]>([]);

  // Função para recuperar dados do localStorage
  const recuperarDados = useCallback((): void => {
    const dadosArmazenados = localStorage.getItem("tarefas");

    if (dadosArmazenados) {
      try {
        const arrayDeObjetosTarefas: Tarefa[] = JSON.parse(dadosArmazenados);
        setArrayTarefas(arrayDeObjetosTarefas);
        setObteveDados(true);

      } catch (erro) {
        console.error("Erro ao parsear os dados do localStorage", erro);
      }
    }
  }, []);

  const atualizarItemNoLocalStorage = useCallback((id: number, novasInformacoes: Partial<Tarefa>) => {
  
      const arrayTarefas: Tarefa[] = JSON.parse(localStorage.getItem('tarefas'));
      arrayTarefas[id] = { ...arrayTarefas[id], ...novasInformacoes };
      localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));

      setArrayTarefas(arrayTarefas);
  },[]);
  


  const obterIdCorrespondente = useCallback((id: number): number => {
    return arrayTarefas.findIndex((tarefaArray: { id: number; }) => tarefaArray.id === id);
  }, [arrayTarefas])

  const obterDiaAtual = (): string => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
  };

  const validouCamposObrigatorios = (nome: string, prazo: string,
     duracao_horas: number, duracao_minutos: number): boolean =>{

    if (nome === "" || prazo === "" || (duracao_horas === 0 && duracao_minutos === 0) ||
     (Number.isNaN(duracao_minutos)) || (Number.isNaN(duracao_horas))) {
      return false;
    }else{
      return true;
    }
  }

  const verificarTarefaEmExecucao = () => {
    const tarefaEmExecucao = arrayTarefas.filter((tarefa) => tarefa.status === "Executando");

    return tarefaEmExecucao.length > 0 ? tarefaEmExecucao[0] : null;
  };

  const definirTarefaEmExecucao = (tarefa: any) :void =>  {
    const id_tarefa_executando = tarefa.id;
    const idCorrespondente = obterIdCorrespondente(id_tarefa_executando);
    setTarefaExecutando(tarefa);
    setIdArrayTarefaExecutando(idCorrespondente);
  }

return (
  <UtilContext.Provider value={{
    recuperarDados, arrayTarefas, idTarefaSelecionada,
    setIdTarefaSelecionada, tituloToast, descricaoToast, setTituloToast, setDescricaoToast, tarefaEmExecucao,
    setTarefaEmExecucao, obterIdCorrespondente, obterDiaAtual, validouCamposObrigatorios,
    idArrayTarefaExecutando, setIdArrayTarefaExecutando, tarefaExecutando, setTarefaExecutando,
    atualizarItemNoLocalStorage, obteveDados, setObteveDados, verificarTarefaEmExecucao, definirTarefaEmExecucao
  }}>
    {children}
  </UtilContext.Provider>
);
};

// Hook customizado para usar o contexto
export const useUtilContext = () => {
  const context = useContext(UtilContext);
  if (!context) {
    throw new Error("useUtilContext deve ser usado dentro de um UtilProvider");
  }
  return context;
};
