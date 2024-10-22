import React, { useEffect } from "react";

import styles from "./Cronometro.module.css"

interface CronometroProps {
  tempo: number;
  ativo: boolean;
  setTempo: (tempo: number) => void;
  formatarTempo: (segundosTotais: number) => string;
}

  function Cronometro( { tempo, setTempo, ativo, formatarTempo }: CronometroProps) {

  useEffect(() => {

    let intervalo: NodeJS.Timeout;
    
    if(ativo && tempo > 0) {
      intervalo = setInterval(() => {
        setTempo(tempo - 1);
      }, 1000);
    } else if (tempo === 0) {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo); 
  }, [ativo, tempo]);

  return (
    <div>
      <h3 className={styles.tempo}>{formatarTempo(tempo)}</h3>
    </div>
  );
};

export default Cronometro;
