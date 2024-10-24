import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ContentModalTarefas from '../ContentModal/ContentModalTarefas/ContentModalTarefas';
import ContentModalApagar from '../ContentModal/ContentModalApagar/ContentModalApagar';

import { ModalContext } from "../../context/ModalContext";

import { useContext } from "react";

import CustomToast from '../CustomToast/CustomToast';

interface CustomModalProps {
  nome_modal: string;
  show: boolean;
  atualizarGrid: () => void;
  handleClose: () => void;
}

function CustomModal({ nome_modal, show, atualizarGrid, handleClose }: CustomModalProps) {

  const { campo_nome, campo_duracao, campo_prazo, campo_observacoes } = useContext(ModalContext);
  const { setCampoNome, setCampoDuracao, setCampoPrazo, setCampoObservacoes } = useContext(ModalContext);
  const { campo_nome_disabled, setCampoNomeDisabled } = useContext(ModalContext);
  const { campo_duracao_disabled, setCampoDuracaoDisabled } = useContext(ModalContext);
  const { campo_prazo_disabled ,setCampoPrazoDisabled } = useContext(ModalContext);
  const { limparStates } = useContext(ModalContext);
  const { idTarefaEditada } = useContext(ModalContext);
  const { arrayTarefas } = useContext(ModalContext);
  const { descricaoModalApagar } = useContext(ModalContext);
  const { idTarefaApagar } = useContext(ModalContext);
  
  const { setTituloToast, setDescricaoToast, tituloToast, descricaoToast } = useContext(ModalContext);

  const [toast, setToast] = useState(false);
  const exibirToast = (): void => setToast(!toast);

  const handleToast = (titulo: string, descricao: string): void => {
    setTituloToast(titulo);
    setDescricaoToast(descricao);
    exibirToast();
  }

  const obterTarefasAFazer = (tarefa: { status: string }): boolean => {
    return tarefa.status === "A fazer";
  };
  
  const apagarTarefasAFazer = (): void => {

    // localStorage.removeItem('tarefas');
    const dadosArmazenados = arrayTarefas;
  
    if (dadosArmazenados) {
      try {
        const tarefasNaoPendentes = dadosArmazenados.filter(
          (tarefa: { status: string }) => !obterTarefasAFazer(tarefa)
        );
  
        localStorage.setItem("tarefas", JSON.stringify(tarefasNaoPendentes));
  
      } catch (erro) {
        console.error("Erro ao processar as tarefas do localStorage", erro);
      }
    }
    handleClose();
    atualizarGrid();
    handleToast("Sucesso", "Tarefas apagadas com sucesso!");
  };

  const fecharModal = (): void => {
    handleClose();
    limparStates();
  }

  const criarTarefa = (): void => {

    if (campo_nome === "" || campo_duracao === "" || campo_prazo === "") {
      handleToast("Erro", "Favor preencher as informações corretamente.");
      return
    }

    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    const ultimoId = tarefasSalvas.length > 0 ? Math.max(...tarefasSalvas.map((tarefa: any) => tarefa.id)) : 0;
    const novoId = ultimoId + 1;

    const novaTarefa = {
      id: novoId,
      nome: campo_nome,
      status: 'A fazer',
      duracao: campo_duracao,
      tempo_restante: campo_duracao,
      tempo_decorrido: "00:00:00",
      prazo: campo_prazo,
      observacoes: campo_observacoes,
    };

    tarefasSalvas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

    handleToast("Sucesso", "Tarefa criada com sucesso!");
    atualizarGrid();
    fecharModal();

  };

  const identificarIdCorrespondente = (): number => {
    return arrayTarefas.findIndex((item: any) => item.id === idTarefaEditada);
  }

  const editarTarefa = (): void =>{

    const itemIndex = identificarIdCorrespondente();

    arrayTarefas[itemIndex].nome = campo_nome;
    arrayTarefas[itemIndex].duracao = campo_duracao;
    arrayTarefas[itemIndex].prazo = campo_prazo;
    arrayTarefas[itemIndex].observacoes = campo_observacoes;

    localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));

    fecharModal();
    atualizarGrid();
    handleToast("Sucesso", "Tarefa salva com sucesso!");
  }

  function handleConfirmClick(): void{

    switch(nome_modal){
      case "Criar Tarefa":
        return criarTarefa();
      case "Apagar Tarefa":
        return verificarModal();
      case "Editar Tarefa":
        return editarTarefa();
  }
}

const apagarTarefaIndividual = (id_tarefa: number): void => {

  const arrayAtualizado = arrayTarefas.filter((item: any) => item.id !== id_tarefa);
  localStorage.setItem('tarefas', JSON.stringify(arrayAtualizado));
  handleToast("Sucesso", "Tarefa apagada com sucesso!");
  handleClose();
  atualizarGrid();
}

const verificarModal = (): void => {

  if(idTarefaApagar > 0)
    return apagarTarefaIndividual(idTarefaApagar);
  else{
    return apagarTarefasAFazer();
  }
}

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nome_modal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Renderização Condicional */}
          {nome_modal == "Criar Tarefa" || nome_modal == "Editar Tarefa" ? (
            <ContentModalTarefas 
              campo_nome={campo_nome}
              campo_duracao={campo_duracao}
              campo_prazo={campo_prazo}
              campo_observacoes={campo_observacoes}
              setCampoNome={setCampoNome}
              setCampoDuracao={setCampoDuracao}
              setCampoPrazo={setCampoPrazo}
              setCampoObservacoes={setCampoObservacoes}
              campo_nome_disabled={campo_nome_disabled}
              setCampoNomeDisabled={setCampoNomeDisabled}
              campo_duracao_disabled={campo_duracao_disabled}
              setCampoDuracaoDisabled={setCampoDuracaoDisabled}
              campo_prazo_disabled={campo_prazo_disabled}
              setCampoPrazoDisabled={setCampoPrazoDisabled}
              />
          ) : (
            <ContentModalApagar descricao={descricaoModalApagar}/>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleConfirmClick}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
      <CustomToast 
        toast={toast} 
        exibirToast={exibirToast} 
        titulo={tituloToast}
        descricao={descricaoToast}
      />
    </>
  );
}

export default CustomModal;
