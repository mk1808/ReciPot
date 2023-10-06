import { Response } from "../data/types";
import restClient from "./RestClient";

function FilesApi() {
    const PREFIX = '/files';

    const saveFile = (file: any, onSuccess: (response: Response<any>) => any, onError: any) => {
        restClient.postFile(`${PREFIX}/save`, file, onSuccess, onError);
    }

    return { saveFile }
}

const filesApi = FilesApi();
export default filesApi;