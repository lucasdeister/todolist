import { createContext, useState, useContext, ReactNode } from "react";

interface Tarefa {
  id: number;
  nome: string;
  prazo: string;
  status: string;
  duracao: string;
  tempo_restante: string;
  observacoes: string;
}

interface ModalContextProps {
  modalState: boolean;
  modalNome: string;
  arrayTarefas: Tarefa[];
  campo_nome: string;
  campo_duracao: string;
  campo_prazo: string;
  campo_observacoes: string;
  campo_nome_disabled: boolean;
  campo_duracao_disabled: boolean;
  campo_prazo_disabled: boolean;
  idTarefaEditada: number;
  tituloToast: string;
  descricaoToast: string;
  descricaoModalApagar: string;
  idTarefaApagar: number;
  verificouTarefaExecutando: boolean;
  setCampoNome: (campo_nome: string) => void;
  setCampoDuracao: (campo_duracao: string) => void;
  setCampoPrazo: (campo_prazo: string) => void;
  setCampoObservacoes: (campo_observacoes: string) => void;
  setModalState: (state: boolean) => void;
  recuperarDados: () => void;
  setModalNome: (state: string) => void;
  limparStates: () => void;
  setCampoNomeDisabled: (campo_nome_disabled: boolean) => void;
  setCampoDuracaoDisabled: (campo_duracao_disabled: boolean) => void;
  setCampoPrazoDisabled: (campo_prazo_disabled: boolean) => void;
  habilitarCamposForm: () => void;
  setIdTarefaEditada: (id_tarefa: number) => void;
  setTituloToast: (titulo_toast: string) => void;
  setDescricaoToast: (descricao_toast: string) => void;
  setDescricaoModalApagar: (descricao_modal_apagar: string) => void;
  setIdTarefaApagar: (id_tarefa_apagar: number) => void;
  setVerificouTarefaExecutando: (tarefa_executando: boolean) => void;
}

// Criando o contexto com tipo adequado
export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Definindo as props para o ModalProvider
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalNome, setModalNome] = useState<string>("");

  const [campo_nome, setCampoNome] = useState<string>('');
  const [campo_duracao, setCampoDuracao] = useState<string>('');
  const [campo_prazo, setCampoPrazo] = useState<string>('');
  const [campo_observacoes, setCampoObservacoes] = useState<string>('');

  const [campo_nome_disabled, setCampoNomeDisabled] = useState<boolean>(false);
  const [campo_duracao_disabled, setCampoDuracaoDisabled] = useState<boolean>(false);
  const [campo_prazo_disabled, setCampoPrazoDisabled] = useState<boolean>(false);

  const [idTarefaEditada, setIdTarefaEditada] = useState<number>(0);

  const [tituloToast, setTituloToast] = useState<string>("");
  const [descricaoToast, setDescricaoToast] = useState<string>("");

  const [descricaoModalApagar, setDescricaoModalApagar] = useState<string>('');

  const [idTarefaApagar, setIdTarefaApagar] = useState<number>(0);

  // Estado para armazenar as tarefas
  const [arrayTarefas, setArrayTarefas] = useState<Tarefa[]>([]);

  const [verificouTarefaExecutando, setVerificouTarefaExecutando] = useState<boolean>(false);

  // Função para recuperar dados do localStorage
  const recuperarDados = () => {
    const dadosArmazenados = localStorage.getItem("tarefas");

    if (dadosArmazenados) {
      try {
        const arrayDeObjetosTarefas: Tarefa[] = JSON.parse(dadosArmazenados);
        setArrayTarefas(arrayDeObjetosTarefas);
      } catch (erro) {
        console.error("Erro ao parsear os dados do localStorage", erro);
      }
    }
  };

  const habilitarCamposForm = (): void => {
    setCampoNomeDisabled(false);
    setCampoDuracaoDisabled(false)
    setCampoPrazoDisabled(false);
  }

  const limparStates = (): void => {
    setCampoNome("");
    setCampoDuracao("");
    setCampoPrazo("");
    setCampoObservacoes("");
  };

  return (
    <ModalContext.Provider value={{
       modalState, setModalState, recuperarDados, limparStates, arrayTarefas, modalNome, setModalNome,
       campo_nome, campo_duracao, campo_observacoes, campo_prazo, setCampoNome, setCampoDuracao,
       setCampoPrazo, setCampoObservacoes, campo_nome_disabled, setCampoNomeDisabled, campo_duracao_disabled,
       setCampoDuracaoDisabled, campo_prazo_disabled, setCampoPrazoDisabled, habilitarCamposForm,
       idTarefaEditada, setIdTarefaEditada, tituloToast, descricaoToast, setTituloToast, setDescricaoToast,
       descricaoModalApagar, setDescricaoModalApagar, idTarefaApagar, setIdTarefaApagar,
       setVerificouTarefaExecutando, verificouTarefaExecutando}}>
        {children}
    </ModalContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext deve ser usado dentro de um ModalProvider");
  }
  return context;
};
