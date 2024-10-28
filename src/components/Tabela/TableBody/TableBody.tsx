import TableRow from "../TableRow.tsx/TableRow";

const TableBody = ({ data, isMobile }) => {

  return (
    <tbody>
      {data.map((row: string, index:number) => (
        <TableRow key={index} rowData={row} isMobile={isMobile} />
      ))}
    </tbody>
  );
};

export default TableBody;
