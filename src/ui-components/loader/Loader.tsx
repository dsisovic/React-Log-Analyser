import { Backdrop } from '@mui/material';
import { ILoaderProps } from './ts/models/loader-props.model';

const Loader = (props: ILoaderProps) => {
    const { show, color, children } = props;
    const colorToUse = !color ? 'black' : color;

    return (
        <>
            <Backdrop
                sx={{ color: colorToUse, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={show}
            >
                {children}
            </Backdrop>
        </>
    );
};

export default Loader;
