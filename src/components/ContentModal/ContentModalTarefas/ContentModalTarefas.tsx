import Campo from "../../Campo/Campo";
import TextArea from "../../Campo/TextArea/TextArea";

import style from "./ContentModalTarefas.module.css"

interface ContentModalTarefasProps {
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
  setCampoNome: (campo_nome: string) => void;
  setCampoDuracaoHoras: (campo_duracao_horas: number) => void;
  setCampoDuracaoMinutos: (campo_duracao_minutos: number) => void;
  setCampoPrazo: (campo_prazo: string) => void;
  setCampoObservacoes: (campo_observacoes: string) => void;
  setCampoInicio: (campo_inicio: string) => void;
  setCampoNomeDisabled: (campo_nome_disabled: boolean) => void;
  setCampoDuracaoDisabled: (campo_duracao_horas_disabled: boolean) => void;
  setCampoPrazoDisabled: (campo_prazo_disabled: boolean) => void;
  setCampoInicioDisabled: (campo_prazo_disabled: boolean) => void;
}

function ContentModalTarefas({
  campo_nome,
  campo_duracao_horas,
  campo_duracao_minutos,
  campo_observacoes,
  campo_prazo,
  campo_inicio,
  setCampoNome,
  setCampoDuracaoHoras,
  setCampoDuracaoMinutos,
  setCampoPrazo,
  setCampoObservacoes,
  setCampoInicio,
  campo_nome_disabled,
  campo_duracao_disabled,
  campo_prazo_disabled,
  campo_inicio_disabled }: ContentModalTarefasProps) {

  return (
    <form>
      <Campo nome={"Nome"} tipo={"text"} value={campo_nome} disabled={campo_nome_disabled}
        onChange={(e) => setCampoNome(e.target.value)} />
      <Campo nome={"Início"} tipo={"date"} value={campo_inicio}
        onChange={(e) => setCampoInicio(e.target.value)} disabled={campo_inicio_disabled} />
      <div className={style.container_duracao}>
        <Campo nome={"Tempo em horas"} tipo={"number"} value={campo_duracao_horas.toString()}
         disabled={campo_duracao_disabled} onChange={(e) => setCampoDuracaoHoras(parseInt(e.target.value))} />
        <Campo nome={"Tempo em minutos"} tipo={"number"} value={campo_duracao_minutos.toString()}
          disabled={campo_duracao_disabled} onChange={(e) => setCampoDuracaoMinutos(parseInt(e.target.value))} />
      </div>
      <Campo nome={"Prazo"} tipo={"date"} value={campo_prazo}
        onChange={(e) => setCampoPrazo(e.target.value)} disabled={campo_prazo_disabled} />
      <TextArea nome={"Observações"} value={campo_observacoes}
        onChange={(e) => setCampoObservacoes(e.target.value)} />
    </form>
  );
}

export default ContentModalTarefas;
