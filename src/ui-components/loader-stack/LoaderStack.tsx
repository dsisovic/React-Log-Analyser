import { Stack } from "@mui/material";

const LoaderStack = (props: { children: React.ReactNode; }) => {
    return (
        <>
          <Stack spacing={1} direction="row" alignItems="center">
            {props.children}
          </Stack>
        </>
    );
};

export default LoaderStack;
