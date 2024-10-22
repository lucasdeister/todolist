import "./TableHeader.module.css"

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((coluna: string, index: number) => (
          <th key={index}>{coluna}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;