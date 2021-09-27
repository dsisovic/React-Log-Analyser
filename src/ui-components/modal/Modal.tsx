import Loader from "../loader/Loader";
import ReactDOM from "react-dom";

const Modal = (props: { show: boolean, color?: string, children: React.ReactNode; }) => {
    return ReactDOM.createPortal(
        <Loader show={props.show} color={props.color}>
            {props.children}
        </Loader>,
        document.querySelector('#overlay-root') as HTMLElement);
};

export default Modal;
