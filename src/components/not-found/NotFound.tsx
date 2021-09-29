import { Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const  { t } = useTranslation('index');

    return (
        <>
            <Alert severity="error">
                <AlertTitle>{t('utils.404')}</AlertTitle>
                {t('utils.badUrl')}
            </Alert>
        </>
    )
}

export default NotFound;  