import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ContentModalTarefas from '../ContentModal/ContentModalTarefas/ContentModalTarefas';
import ContentModalApagar from '../ContentModal/ContentModalApagar/ContentModalApagar';

import { ModalContext } from "../../context/ModalContext";
import { UtilContext } from '../../context/UtilContext';

import { useContext } from "react";

import CustomToast from '../CustomToast/CustomToast';

interface CustomModalProps {
  nome_modal: string;
  show: boolean;
  atualizarGrid: () => void;
  handleClose: () => void;
}

function CustomModal({ nome_modal, show, atualizarGrid, handleClose }: CustomModalProps) {

  const { campo_nome, campo_duracao_horas, campo_prazo, campo_observacoes,
    setCampoNome, setCampoDuracaoHoras, setCampoPrazo, setCampoObservacoes,
    campo_nome_disabled, setCampoNomeDisabled, descricaoModalApagar,
    campo_duracao_disabled, setCampoDuracaoDisabled, campo_prazo_disabled,
    setCampoPrazoDisabled, limparStates, campo_inicio, campo_inicio_disabled,
    setCampoInicio, setCampoInicioDisabled, campo_duracao_minutos, setCampoDuracaoMinutos,
   } = useContext(ModalContext);
   
  const { idTarefaSelecionada, arrayTarefas, obterIdCorrespondente,
     setTituloToast, setDescricaoToast, tituloToast, descricaoToast, validouCamposObrigatorios 
  } = useContext(UtilContext);

  const [toast, setToast] = useState(false);
  const exibirToast = (): void => setToast(!toast);

  const handleToast = (titulo: string, descricao: string): void => {
    setTituloToast(titulo);
    setDescricaoToast(descricao);
    exibirToast();
  }

  const obterTarefasAFazer = (tarefa: { status: string }): boolean => {
    return tarefa.status === "Pausada";//A fazer
  };
  
  const apagarTarefasAFazer = (): void => {

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


  function obterDuracao(horas: number, minutos: number) {
    const horasFormatadas = String(horas).padStart(2, '0');
    const minutosFormatados = String(minutos).padStart(2, '0');
    
    return `${horasFormatadas}:${minutosFormatados}:00`;
  }

  
  const duracao_tarefa = obterDuracao(campo_duracao_horas, campo_duracao_minutos);

  const criarTarefa = (): void => {

    // if(!validouCamposObrigatorios(campo_nome, campo_prazo, campo_duracao_horas, campo_duracao_minutos)){
    //   handleToast("Erro", "Favor preencher as informações corretamente.");
    //   return
    // }

    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    const ultimoId = tarefasSalvas.length > 0 ? Math.max(...tarefasSalvas.map((tarefa: any) => tarefa.id)) : 0;
    const novoId = ultimoId + 1;

    const novaTarefa = {
      id: novoId,
      nome: campo_nome,
      status: 'A fazer',
      duracao: "01:00:00",//duracao_tarefa
      tempo_restante: "01:00:00",//duracao_tarefa
      tempo_decorrido: "00:00:00",
      prazo: campo_prazo,
      observacoes: campo_observacoes,
      inicio: campo_inicio,
      data_execucao: ""
    };

    tarefasSalvas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

    handleToast("Sucesso", "Tarefa criada com sucesso!");
    atualizarGrid();
    fecharModal();

  };

  const editarTarefa = (): void => {

    if(!validouCamposObrigatorios(campo_nome, campo_prazo, campo_duracao_horas, campo_duracao_minutos)){
      handleToast("Erro", "Favor preencher as informações corretamente.");
      return
    }

    const itemIndex = obterIdCorrespondente(idTarefaSelecionada);

    arrayTarefas[itemIndex].nome = campo_nome;
    arrayTarefas[itemIndex].duracao = duracao_tarefa;
    arrayTarefas[itemIndex].prazo = campo_prazo;
    arrayTarefas[itemIndex].observacoes = campo_observacoes;
    arrayTarefas[itemIndex].inicio = campo_inicio;

    if(arrayTarefas[itemIndex].status === "A fazer"){
      arrayTarefas[itemIndex].tempo_restante = duracao_tarefa;
    }

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

  if(idTarefaSelecionada > 0)
    apagarTarefaIndividual(idTarefaSelecionada);
  else{
    apagarTarefasAFazer();
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
          {nome_modal === "Criar Tarefa" || nome_modal === "Editar Tarefa" ? (
            <ContentModalTarefas 
              campo_nome={campo_nome}
              campo_duracao_minutos={campo_duracao_minutos}
              campo_duracao_horas={campo_duracao_horas}
              campo_prazo={campo_prazo}
              campo_observacoes={campo_observacoes}
              campo_inicio={campo_inicio}
              setCampoNome={setCampoNome}
              setCampoDuracaoMinutos={setCampoDuracaoMinutos}
              setCampoDuracaoHoras={setCampoDuracaoHoras}
              setCampoPrazo={setCampoPrazo}
              setCampoObservacoes={setCampoObservacoes}
              setCampoInicio={setCampoInicio}
              campo_nome_disabled={campo_nome_disabled}
              setCampoNomeDisabled={setCampoNomeDisabled}
              campo_duracao_disabled={campo_duracao_disabled}
              setCampoDuracaoDisabled={setCampoDuracaoDisabled}
              campo_prazo_disabled={campo_prazo_disabled}
              setCampoPrazoDisabled={setCampoPrazoDisabled}
              campo_inicio_disabled={campo_inicio_disabled}
              setCampoInicioDisabled={setCampoInicioDisabled}
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
