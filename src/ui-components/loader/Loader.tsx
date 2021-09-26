import { Backdrop, CircularProgress } from '@mui/material';
import * as eventsUtil from '../../components/events/events-util';

const Loader = (props: { isLoading: boolean }) => {
    return (
        <>
            <Backdrop
                sx={{ color: eventsUtil.BLUE_COLOR, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Loader;
