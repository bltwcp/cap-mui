import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { MultiSelect } from '../Components';
import { fetchPortOfLoading } from './APIs/request';
const usePortOfLoading = () => useQuery(['PortOfLoading'], fetchPortOfLoading, {
    staleTime: Infinity,
    placeholderData: [],
    retry: 3,
    select: (data) => data?.content?.map((d) => d?.name),
});
export const PortSelect = (props) => {
    const { data } = usePortOfLoading();
    return (_jsx(MultiSelect, { label: 'Port', placeholder: 'ALL', tooltip: 'verticle', abbr: '...', sx: { width: '150px' }, ...props, menuItems: data }));
};
export default PortSelect;
