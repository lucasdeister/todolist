import { Toast } from "react-bootstrap";

import "./CustomToast.module.css"

interface CustomToastProps{
    toast: boolean;
    exibirToast: () => void;
    titulo: string;
    descricao: string;
}

function CustomToast( {toast, exibirToast, titulo, descricao}: CustomToastProps) {
    return (
        <Toast className="position-fixed top-0 end-0"
            onClose={exibirToast}
            show={toast}
            delay={2000}
            autohide>
            <Toast.Header>
                <strong className="mr-auto">{titulo}</strong>
            </Toast.Header>
            <Toast.Body>{descricao}</Toast.Body>
        </Toast>
    )
}


export default CustomToast;