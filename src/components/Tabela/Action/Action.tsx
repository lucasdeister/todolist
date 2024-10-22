import ItemAction from './ItemAction/ItemAction';

import "./Action.module.css"

interface ActionProps {
    id: number;
    status: string;
    tempo_restante: string;
}

const opcoes = [
    {
        nome: "Executar",
        nome_icone: "play-fill",
        statusPermitido: ["A fazer", "Pausada"]
    },
    {
        nome: "Pausar",
        nome_icone: "pause-fill",
        statusPermitido: ["Executando"],
    },
    {
        nome: "Editar",
        nome_icone: "pencil",
        statusPermitido: ["A fazer", "Executando", "Pausada", "Concluída", "Cancelada"],
    },
    {
        nome: "Concluir",
        nome_icone: "check-lg",
        statusPermitido: ["Executando"],
    },
    {
        nome: "Cancelar",
        nome_icone: "x-circle",
        statusPermitido: ["Executando"],
    },
    {
        nome: "Apagar",
        nome_icone: "eraser-fill",
        statusPermitido: ["A fazer", "Concluída", "Cancelada"],
    }
];

const Action = ({ status, id, tempo_restante } : ActionProps) => {

    const filtrarOpcoesPorStatus = () => {
        return opcoes.filter(opcao => opcao.statusPermitido.includes(status));
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Selecione
            </button>
            <ul className="dropdown-menu">
                {filtrarOpcoesPorStatus().map((opcao, index) => (
                       <ItemAction
                            key={index}
                            nome={opcao.nome}
                            id={id}
                            nome_icone={opcao.nome_icone}
                            tempo_restante={tempo_restante} />
                ))}
            </ul>
        </div>
    );
};

export default Action;