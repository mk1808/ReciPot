export const openInBackground = (url: string, event: any, navigate: any) => {
    if (event.ctrlKey) {
        window.open(url, "_blank")
        window.focus();
    } else {
        navigate(url)
    }
}