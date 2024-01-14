export interface IUser {
    id: number;
    email: string;
    timestamp: Date;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    username: string;
}

export interface IAuth {
    email: string;
    password: string;
}

export interface IAuthResponse {
    user: IUser | null;
    token: string;
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
    id?: number;
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

export interface Formik {
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    };
    handleBlur: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
}

