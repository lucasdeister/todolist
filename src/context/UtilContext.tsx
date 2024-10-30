import { createContext, useState, useContext, ReactNode, useCallback } from "react";

interface Tarefa {
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
  verificouTarefaExecutando: boolean;
  tituloToast: string;
  descricaoToast: string;
  tarefaEmExecucao: boolean;
  recuperarDados: () => void;
  setVerificouTarefaExecutando: (tarefa_executando: boolean) => void;
  setIdTarefaSelecionada: (id_tarefa: number) => void;
  setTituloToast: (titulo_toast: string) => void;
  setDescricaoToast: (descricao_toast: string) => void;
  setTtarefaEmExecucao: (tarefaEmExecucao: boolean) => void;
  obterIdCorrespondente: (id: number) => number;
}

// Criando o contexto com tipo adequado
export const UtilContext = createContext<UtilContextProps | undefined>(undefined);

// Definindo as props para o UtilProvider
interface UtilProviderProps {
  children: ReactNode;
}

export const UtilProvider = ({ children }: UtilProviderProps) => {

  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState<number>(0);

  const [tituloToast, setTituloToast] = useState<string>("");
  const [descricaoToast, setDescricaoToast] = useState<string>("");

  const [tarefaEmExecucao, setTtarefaEmExecucao] = useState<boolean>(false);

  // Estado para armazenar as tarefas
  const [arrayTarefas, setArrayTarefas] = useState<Tarefa[]>([]);

  const [verificouTarefaExecutando, setVerificouTarefaExecutando] = useState<boolean>(false);

  // Função para recuperar dados do localStorage
  const recuperarDados = useCallback((): void => {
    const dadosArmazenados = localStorage.getItem("tarefas");

    if (dadosArmazenados) {
      try {
        const arrayDeObjetosTarefas: Tarefa[] = JSON.parse(dadosArmazenados);
        setArrayTarefas(arrayDeObjetosTarefas);
      } catch (erro) {
        console.error("Erro ao parsear os dados do localStorage", erro);
      }
    }
  }, []);

  // const obterIdCorrespondente = useCallback((id: number): number => {
  //   return arrayTarefas.findIndex((tarefaArray: { id: number; }) => tarefaArray.id === id);
  // }, []);

  const obterIdCorrespondente = (id: number): number => {
    return arrayTarefas.findIndex((tarefaArray: { id: number; }) => tarefaArray.id === id);
  }

return (
  <UtilContext.Provider value={{
    recuperarDados, arrayTarefas, idTarefaSelecionada,
    setIdTarefaSelecionada, setVerificouTarefaExecutando, verificouTarefaExecutando,
    tituloToast, descricaoToast, setTituloToast, setDescricaoToast, tarefaEmExecucao,
    setTtarefaEmExecucao, obterIdCorrespondente
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
