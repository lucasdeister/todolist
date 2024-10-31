import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  modalState: boolean;
  modalNome: string;
  campo_nome: string;
  campo_duracao_horas: number;
  campo_duracao_minutos: number;
  campo_prazo: string;
  campo_observacoes: string;
  campo_inicio: string;
  campo_nome_disabled: boolean;
  campo_duracao_disabled: boolean;
  campo_prazo_disabled: boolean;
  campo_inicio_disabled: boolean;
  descricaoModalApagar: string;
  setCampoNome: (campo_nome: string) => void;
  setCampoDuracaoHoras: (campo_duracao_horas: number) => void;
  setCampoDuracaoMinutos: (campo_duracao_minutos: number) => void;
  setCampoPrazo: (campo_prazo: string) => void;
  setCampoObservacoes: (campo_observacoes: string) => void;
  setCampoInicio: (campo_inicio: string) => void;
  setModalState: (state: boolean) => void;
  setModalNome: (state: string) => void;
  limparStates: () => void;
  setCampoNomeDisabled: (campo_nome_disabled: boolean) => void;
  setCampoDuracaoDisabled: (campo_duracao_disabled: boolean) => void;
  setCampoPrazoDisabled: (campo_prazo_disabled: boolean) => void;
  setCampoInicioDisabled: (campo_inicio_disabled: boolean) => void;
  habilitarCamposForm: () => void;
  setDescricaoModalApagar: (descricao_modal_apagar: string) => void;
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
  const [campo_duracao_horas, setCampoDuracaoHoras] = useState<number>(0);
  const [campo_duracao_minutos, setCampoDuracaoMinutos] = useState<number>(0);
  const [campo_prazo, setCampoPrazo] = useState<string>('');
  const [campo_observacoes, setCampoObservacoes] = useState<string>('');
  const [campo_inicio, setCampoInicio] = useState<string>('');

  const [campo_nome_disabled, setCampoNomeDisabled] = useState<boolean>(false);
  const [campo_duracao_disabled, setCampoDuracaoDisabled] = useState<boolean>(false);
  const [campo_prazo_disabled, setCampoPrazoDisabled] = useState<boolean>(false);
  const [campo_inicio_disabled, setCampoInicioDisabled] = useState<boolean>(false);

  const [descricaoModalApagar, setDescricaoModalApagar] = useState<string>('');

  const habilitarCamposForm = (): void => {
    setCampoNomeDisabled(false);
    setCampoDuracaoDisabled(false)
    setCampoPrazoDisabled(false);
    setCampoInicioDisabled(false);
  }

  const limparStates = (): void => {
    setCampoNome("");
    setCampoDuracaoHoras(0);
    setCampoDuracaoMinutos(0);
    setCampoPrazo("");
    setCampoObservacoes("");
    setCampoInicio("");
  };


  return (
    <ModalContext.Provider value={{
       modalState, setModalState, limparStates, modalNome, setModalNome,
       campo_nome, campo_duracao_horas, campo_duracao_minutos, campo_observacoes, campo_prazo, setCampoNome,
       setCampoDuracaoHoras, setCampoDuracaoMinutos, setCampoPrazo, setCampoObservacoes, campo_nome_disabled,
       setCampoNomeDisabled, campo_duracao_disabled, setCampoDuracaoDisabled,
       campo_prazo_disabled, setCampoPrazoDisabled, habilitarCamposForm, descricaoModalApagar,
       setDescricaoModalApagar, campo_inicio, setCampoInicio, campo_inicio_disabled,
       setCampoInicioDisabled}}>
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
