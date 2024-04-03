import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { MultiSelect } from '../Components';
import { fetchVendors } from './APIs/request';
const useVendor = (pHierarchies, agents, orderTypes, payments) => useQuery(['Vendor', pHierarchies, agents, orderTypes, payments], () => fetchVendors(pHierarchies, agents, orderTypes, payments), {
    staleTime: Infinity,
    initialData: [],
    select: (data) => data?.content?.map((d) => d?.name),
    retry: 0,
});
export const VendorSelect = (props) => {
    const { data } = useVendor(props.pHierarchies, props.agents, props.orderTypes, props.payments);
    return (_jsx(MultiSelect, { label: 'Vendor', placeholder: 'ALL', tooltip: 'verticle', abbr: '...', sx: { width: '150px' }, ...props, menuItems: data }));
};
export default VendorSelect;
