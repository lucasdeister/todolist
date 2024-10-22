import TableRow from "../TableRow.tsx/TableRow";

const TableBody = ({ data }) => {

  return (
    <tbody>
      {data.map((row: string, index:number) => (
        <TableRow key={index} rowData={row} />
      ))}
    </tbody>
  );
};

export default TableBody;
