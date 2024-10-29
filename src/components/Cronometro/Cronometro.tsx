import { useEffect } from "react";

import styles from "./Cronometro.module.css"

interface CronometroProps {
  tempoRestante: number;
  tempoDecorrido: number;
  cronometroAtivo: boolean;
  setTempoRestante: (tempo: number) => void;
  setTempoDecorrido: (tempo: number) => void;
  formatarTempo: (segundosTotais: number) => string;
}

  function Cronometro( { tempoRestante, setTempoRestante,
     cronometroAtivo, formatarTempo, tempoDecorrido, setTempoDecorrido }: CronometroProps) {

  useEffect(() => {

    let intervalo: NodeJS.Timeout;
    
    if(cronometroAtivo) {
      intervalo = setInterval(() => {
        setTempoDecorrido(tempoDecorrido + 1);
        if(tempoRestante > 0)
        setTempoRestante(tempoRestante - 1);
      }, 1000);
    } else{
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo); 
  }, [cronometroAtivo, tempoRestante, setTempoRestante, tempoDecorrido, setTempoDecorrido]);


  return (
    <div>
      <h3 className={styles.tempo}>{formatarTempo(tempoRestante)}</h3>
    </div>
  );
};

export default Cronometro;
