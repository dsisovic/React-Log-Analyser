import { Alert, AlertTitle } from '@mui/material';

const NotFound = () => {
    return (
        <>
            <Alert severity="error">
                <AlertTitle>404 Not Found</AlertTitle>
                Can't find requested page. Please check if URL is correct.
            </Alert>
        </>
    )
}

export default NotFound;