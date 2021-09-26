import { IUseFetchHookProps } from "./ts/models/use-fetch-hook-props.model";
import axios from "axios";

const useFetch = async (props: IUseFetchHookProps) => {
    try {
        const httpData = await axios.get(props.fetchUrl);

        return httpData.data;
    } catch {
        return null;
    }
};

export default useFetch;