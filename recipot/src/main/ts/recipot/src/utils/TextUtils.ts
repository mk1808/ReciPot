
export const getShorterText = (text:string, size:number) => text.length > size ? text.substring(0, size) + "..." : text;

export const getCollectionName = (collection: any, t:any) => {
    let name = collection?.name;
    return collection?.canDelete ? name : t("enums.DefaultRecipeCollections." + name?.toUpperCase())
};