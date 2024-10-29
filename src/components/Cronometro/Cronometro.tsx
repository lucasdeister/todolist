import React, { useEffect } from "react";

import styles from "./Cronometro.module.css"

interface CronometroProps {
  tempo: number;
  cronometroAtivo: boolean;
  setTempo: (tempo: number) => void;
  formatarTempo: (segundosTotais: number) => string;
}

  function Cronometro( { tempo, setTempo, cronometroAtivo, formatarTempo }: CronometroProps) {

  useEffect(() => {

    let intervalo: NodeJS.Timeout;
    
    if(cronometroAtivo && tempo > 0) {
      intervalo = setInterval(() => {
        setTempo(tempo - 1);
      }, 1000);
    } else if (tempo === 0) {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo); 
  }, [cronometroAtivo, tempo]);

  return (
    <div>
      <h3 className={styles.tempo}>{formatarTempo(tempo)}</h3>
    </div>
  );
};

export default Cronometro;
