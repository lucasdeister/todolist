// TextArea.tsx
import React from 'react';

import styles from "../Campo.module.css"

interface TextAreaProps {
  nome: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ nome, value, onChange }: TextAreaProps) {
  return (
    <div className="mt-3">
      <label 
        htmlFor='observacoes'
        className="form-label">{nome}
        <span className={styles.optional}>(Opcional)</span>
      </label>
      <textarea
        id='observacoes'
        className="form-control"
        value={value}
        onChange={onChange}
        rows={3}
      />
    </div>
  );
}

export default TextArea;
