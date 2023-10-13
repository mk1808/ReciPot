import { useState } from "react";

function useRequestSendManager():[(request: Function) => any, () => any] {
    const [pending, setPending] = useState<boolean>(false);

    function nextAndLock(request: Function) {
        if (!pending) {
            request();
            setPending(true);
        }
    }

    function unlock() {
        setPending(false);
    }

    return [
        nextAndLock,
        unlock
    ]
}

export default useRequestSendManager;