export interface IUser {
    id: number;
    email: string;
    timestamp: Date;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
}

export interface IAccounting {
    id: number;
    name: string;
    coefficient: number;
}

export interface ICategory {
    id: number;
    name: string;
    accounting: IAccounting
}

export interface IPaymentMethod {
    id: number;
    name: string;
}

export interface ITransaction {
    id: number;
    amount: number;
    date: Date;
    category: ICategory;
    payment_method: IPaymentMethod;
}

export interface ITransactionQuery extends IFilter {
    page: number;
    field: string;
    direction: string;
}

export interface ITransactionResult {
    results?: ITransaction[];
    count?: number;
}

export interface IFilter {
    [key: string]: any;
}

export interface ICurrentFilter {
    filter: string;
    query: string;
}

export interface ISort {
    field: string; 
    direction: string;
}

export interface IPagination {
    pageSize: number;
    currentPage: number;
}