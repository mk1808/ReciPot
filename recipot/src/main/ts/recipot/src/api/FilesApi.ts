import restClient from "./RestClient";
import { Response } from "../data/types";

function FilesApi() {
    const PREFIX = '/files';

    const saveFile = (file: any, onSuccess: (response: Response<any>) => any, onError: any) => {
        restClient.postFile(`${PREFIX}`, file, onSuccess, onError);
    }

    return { saveFile }
}

const filesApi = FilesApi();
export default filesApi;