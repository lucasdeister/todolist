import React from 'react';

import styles from "./Campo.module.css"

interface CampoProps {
  nome: string;
  tipo: string;
  value: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Campo({ nome, tipo, value, onChange, disabled }: CampoProps) {

  return (
    <div className={`form-group mt-3 ${tipo === "number" ? "me-3" : ""}`}>
      <label htmlFor={nome.toLowerCase()} className="form-label">
        {nome}
        {nome === "Início" && <span className={styles.optional}>(Opcional)</span>}
      </label>
      <input
        id={nome.toLowerCase()}
        className="form-control" 
        type={tipo} 
        value={value} 
        // {...(tipo === "number" ? { step: "1", min: "0", max: "100" } : {})}
        onChange={onChange}
        required
        disabled={disabled}
      />
    </div>
  );
}

export default Campo;
