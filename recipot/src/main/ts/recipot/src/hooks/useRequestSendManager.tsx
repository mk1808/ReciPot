import { useRef } from "react";

function useRequestSendManager():[(request: Function) => any, () => any] {
    const pending:any = useRef()

    function nextAndLock(request: Function) {
        if (!pending.current) {
            request();
            pending.current= true;
        }
    }

    function unlock() {
        pending.current = false;
    }

    return [
        nextAndLock,
        unlock
    ]
}

export default useRequestSendManager;