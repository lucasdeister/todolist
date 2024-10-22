// TextArea.tsx
import React from 'react';

interface TextAreaProps {
  nome: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ nome, value, onChange }: TextAreaProps) {
  return (
    <div className="mt-3">
      <label className="form-label">{nome}</label>
      <textarea
        className="form-control"
        value={value}
        onChange={onChange}
        rows={3}
      />
    </div>
  );
}

export default TextArea;
