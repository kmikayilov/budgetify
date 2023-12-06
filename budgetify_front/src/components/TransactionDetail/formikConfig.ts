import { FormikTouched, FormikErrors } from 'formik';
import { Formik } from '../../helpers/types';
import * as yup from 'yup';

interface TransactionFormStructure {  
    date: Date;
    amount: string;
    category: string;
    payment_method: string;
}

export interface TransactionFormik extends Formik {
    values: TransactionFormStructure;
    touched: FormikTouched<TransactionFormStructure>;
    errors: FormikErrors<TransactionFormStructure>;
    setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<TransactionFormStructure>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<TransactionFormStructure>>;
    isEditing: boolean;
}

export const schema = yup.object().shape({
	date: yup.date().required('Transaction date is required'),
	amount: yup.string().matches(/^\d+$/).required('Transaction amount is required'),
	category: yup.string().required('Category is required'),
	payment_method: yup.string().required('Payment method is required'),
})

export const initialValues: TransactionFormStructure = {
    date: new Date(),
    amount: '',
    category: '',
    payment_method: ''
};