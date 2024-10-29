import { createContext, useState, useContext, ReactNode } from "react";

interface ModalContextProps {
  modalState: boolean;
  modalNome: string;
  campo_nome: string;
  campo_duracao: string;
  campo_prazo: string;
  campo_observacoes: string;
  campo_nome_disabled: boolean;
  campo_duracao_disabled: boolean;
  campo_prazo_disabled: boolean;
  descricaoModalApagar: string;
  setCampoNome: (campo_nome: string) => void;
  setCampoDuracao: (campo_duracao: string) => void;
  setCampoPrazo: (campo_prazo: string) => void;
  setCampoObservacoes: (campo_observacoes: string) => void;
  setModalState: (state: boolean) => void;
  setModalNome: (state: string) => void;
  limparStates: () => void;
  setCampoNomeDisabled: (campo_nome_disabled: boolean) => void;
  setCampoDuracaoDisabled: (campo_duracao_disabled: boolean) => void;
  setCampoPrazoDisabled: (campo_prazo_disabled: boolean) => void;
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
  const [campo_duracao, setCampoDuracao] = useState<string>('');
  const [campo_prazo, setCampoPrazo] = useState<string>('');
  const [campo_observacoes, setCampoObservacoes] = useState<string>('');

  const [campo_nome_disabled, setCampoNomeDisabled] = useState<boolean>(false);
  const [campo_duracao_disabled, setCampoDuracaoDisabled] = useState<boolean>(false);
  const [campo_prazo_disabled, setCampoPrazoDisabled] = useState<boolean>(false);

  const [descricaoModalApagar, setDescricaoModalApagar] = useState<string>('');

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
       modalState, setModalState, limparStates, modalNome, setModalNome,
       campo_nome, campo_duracao, campo_observacoes, campo_prazo, setCampoNome, setCampoDuracao,
       setCampoPrazo, setCampoObservacoes, campo_nome_disabled, setCampoNomeDisabled,
       campo_duracao_disabled, setCampoDuracaoDisabled, campo_prazo_disabled, setCampoPrazoDisabled,
       habilitarCamposForm, descricaoModalApagar, setDescricaoModalApagar}}>
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
