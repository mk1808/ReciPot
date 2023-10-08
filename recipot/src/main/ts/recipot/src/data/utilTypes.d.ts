export interface MyForm {
    formValue: any;
    formValidity: any;
}

export interface FormSave<T> {
    onSubmit: (t: T) => any;
    onSuccess: (t: Response<T>) => any;
    onError: (t: Response<T>) => any;
}

export interface Enums {
    difficulties: [] | Function,
    requiredEfforts: [] | Function,
    amountsOfDishes: [] | Function,
    accessTypes: [] | Function,
}

export interface ResponsePage<T> {
    content: T[],
    pageable: {
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        pageNumber: number,
        pageSize: number,
        unpaged: boolean,
        paged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    first: true,
    numberOfElements: 1,
    empty: false
}

export interface NavOpen {
    id?: string, 
    url?: string
}