import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import { IModuleModal } from "./ts/models/module-modal.model";
import { useTranslation } from "react-i18next";
import Modal from "../modal/Modal";
import * as mainUtil from "../../utils/main-util";

const ModuleModal = (props: IModuleModal) => {
    const  { t } = useTranslation('index');

    return (
        <>
            <Modal show={props.isLoading} color={mainUtil.BLUE_COLOR}>
                <CircularProgress color="inherit" />
            </Modal>

            <Modal show={props.showErrorModal}>
                <Alert severity="error">
                    <AlertTitle>{t('utils.error')}</AlertTitle>
                    {t('utils.errorDescription')}
                </Alert>
            </Modal>
        </>
    );
}

export default ModuleModal;