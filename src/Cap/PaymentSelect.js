import { jsx as _jsx } from "react/jsx-runtime";
import { MultiSelect } from '../Components';
const defaultPayments = ['Paid', 'Unpaid'];
export const PaymentSelect = (props) => {
    return (_jsx(MultiSelect, { label: 'Payment', placeholder: 'ALL', tooltip: 'verticle', abbr: '...', sx: { width: '120px' }, ...props, menuItems: defaultPayments }));
};
export default PaymentSelect;
