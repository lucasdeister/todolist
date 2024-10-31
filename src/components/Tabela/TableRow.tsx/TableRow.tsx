import Action from '../Action/Action';

const TableRow = ({ rowData, isMobile }) => {

  function converterData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  const prazo = converterData(rowData.prazo);

  let inicio = "";

  if(rowData.inicio !== ""){
    inicio = converterData(rowData.inicio);
  }else{
    inicio = "---"
  }

  return (
    <tr>
        <td>{rowData.id}</td>
        <td>{rowData.nome}</td>
        <td>{rowData.status}</td>
        {!isMobile && <td>{inicio}</td>}
        {!isMobile && <td>{rowData.duracao}</td>}
        {!isMobile && <td>{rowData.tempo_restante}</td>}
        {!isMobile && <td>{rowData.tempo_decorrido}</td>}
        {!isMobile && <td>{prazo}</td>}
        <td>
            <Action
                status={rowData.status}
                id={rowData.id}
                tempo_restante={rowData.tempo_restante}
                tempo_decorrido={rowData.tempo_decorrido}
            />
        </td>
    </tr>
);
};

export default TableRow;