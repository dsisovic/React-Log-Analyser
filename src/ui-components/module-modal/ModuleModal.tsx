import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { IModuleModal } from "./ts/models/module-modal.model";
import Modal from "../modal/Modal";
import * as mainUtil from "../../utils/main-util";

const ModuleModal = (props: IModuleModal) => {
    return (
        <>
            <Modal show={props.isLoading} color={mainUtil.BLUE_COLOR}>
                <CircularProgress color="inherit" />
            </Modal>

            <Modal show={props.showErrorModal}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Problem occured while fetching data. Please check internet connection!
                </Alert>
            </Modal>
        </>
    );
}

export default ModuleModal;