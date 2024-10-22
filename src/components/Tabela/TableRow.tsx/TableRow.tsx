import Action from '../Action/Action';

const TableRow = ({ rowData }) => {

  function converterData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  const data_convertida = converterData(rowData.prazo);

  return (
      <tr>
        <td>{rowData.id}</td>
        <td>{rowData.nome}</td>
        <td>{rowData.status}</td>
        <td>{rowData.duracao}</td>
        <td>{rowData.tempo_restante}</td>
        <td>{rowData.tempo_decorrido}</td>
        <td>{data_convertida}</td>
        <td>
            <Action
              status={rowData.status} 
              id={rowData.id} 
              tempo_restante={rowData.tempo_restante}/>
        </td>
      </tr>
  );
};

export default TableRow;
