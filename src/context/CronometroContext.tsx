import { createContext, useContext, ReactNode, useState } from "react";

interface CronometroContextProps {
  tempo: number;
  ativo: boolean;
  setTempo: (tempo: number) => void;
  converterTempoParaSegundos: (tempo: string) => number;
  setCronometroAtivo: (status_cronometro: boolean) => void;
  formatarTempo: (segundosTotais: number) => string;
}

export const CronometroContext = createContext<CronometroContextProps | undefined>(undefined);

interface CronometroProviderProps {
  children: ReactNode;
}

export const CronometroProvider = ({ children }: CronometroProviderProps) => {

  const [tempo, setTempo] = useState<number>(0);
  const [ativo, setCronometroAtivo] = useState<boolean>(false);

  const converterTempoParaSegundos = (tempo: string): number => {
    const [horas, minutos, segundos] = tempo.split(":").map(Number);
    return horas * 3600 + minutos * 60 + segundos;
  };

  // Função para formatar o tempo em horas, minutos e segundos
  const formatarTempo = (segundosTotais: number): string => {
    const horas = Math.floor(segundosTotais / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
    const segundosFormatados = String(segundos).padStart(2, '0');

    return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
  };

  return (
    <CronometroContext.Provider value={{ tempo, setTempo, converterTempoParaSegundos,
     ativo, setCronometroAtivo, formatarTempo}}>
      {children}
    </CronometroContext.Provider>
  );
};

export const useCronometroContext = () => {
  const context = useContext(CronometroContext);
  if (!context) {
    throw new Error("useCronometroContext deve ser usado dentro de um CronometroProvider");
  }
  return context;
};
