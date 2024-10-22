import Campo from "../../Campo/Campo";
import TextArea from "../../Campo/TextArea/TextArea";

interface ContentModalTarefasProps{
  campo_nome: string;
  campo_duracao: string;
  campo_prazo: string;
  campo_observacoes: string;
  campo_nome_disabled: boolean;
  campo_duracao_disabled: boolean;
  campo_prazo_disabled: boolean;
  setCampoNome: (campo_nome: string) => void;
  setCampoDuracao: (campo_duracao: string) => void;
  setCampoPrazo: (campo_prazo: string) => void;
  setCampoObservacoes: (campo_observacoes: string) => void;
  setCampoNomeDisabled: (campo_nome_disabled: boolean) => void;
  setCampoDuracaoDisabled: (campo_duracao_disabled: boolean) => void;
  setCampoPrazoDisabled: (campo_prazo_disabled: boolean) => void;
}

function ContentModalTarefas( {
    campo_nome,
    campo_duracao,
    campo_observacoes, 
    campo_prazo,
    setCampoNome,
    setCampoDuracao,
    setCampoPrazo,
    setCampoObservacoes,
    campo_nome_disabled,
    campo_duracao_disabled,
    campo_prazo_disabled } : ContentModalTarefasProps ) {

  return (
    <form>
      <Campo nome={"Nome"} tipo={"text"} value={campo_nome} disabled={campo_nome_disabled}
        onChange={(e) => setCampoNome(e.target.value)}/>
      <Campo nome={"Duração"} tipo={"time"} value={campo_duracao} disabled={campo_duracao_disabled}
        onChange={(e) => setCampoDuracao(e.target.value)} />
      <Campo nome={"Prazo"} tipo={"date"} value={campo_prazo} 
        onChange={(e) => setCampoPrazo(e.target.value)} disabled={campo_prazo_disabled}/>
      <TextArea nome={"Observações"} value={campo_observacoes}
        onChange={(e) => setCampoObservacoes(e.target.value)} />
    </form>
  );
}

export default ContentModalTarefas;
