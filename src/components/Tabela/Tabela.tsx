import TableHeader from "./TableHeader/TableHeader"
import TableBody from './TableBody/TableBody';

import "./Tabela.module.css"

const Tabela = ({ columns, data, isMobile }) => {

  return (
    <table className="table table-striped table-hover align-middle text-center table-responsive">
      <TableHeader columns={columns} />
      <TableBody data={data} isMobile={isMobile} />
    </table>
  );
};

export default Tabela;