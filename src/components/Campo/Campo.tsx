import React from 'react';

interface CampoProps {
  nome: string;
  tipo: string;
  value: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Campo({ nome, tipo, value, onChange, disabled }: CampoProps) {

  return (
    <div className="form-group mt-3">
      <label className="form-label">{nome}</label>
      <input 
        className="form-control" 
        type={tipo} 
        value={value} 
        {...(tipo === "time" ? { step: "1" } : {})}
        onChange={onChange}
        required
        disabled={disabled}
      />
    </div>
  );
}

export default Campo;
