
export function onAddElementClick (setElements:any, elements:any, basicElement:any) {
    let list = [...elements];
    list.push(basicElement);
    setElements(list);
}
export function onDeleteElementClick (setElements:any, elements:any, index: number, ) {
    let list = [...elements];
    list.splice(index || 0, 1);
    setElements(list);
}