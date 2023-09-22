
export function ApiRequestSendManager() {
    var pending = false;

    function nextAndLock(request: Function) {
        if (!pending) {
            request();
            pending = true;
        }
    }

    function unlock() {
        pending = false;
    }

    return {
        nextAndLock,
        unlock
    }
}