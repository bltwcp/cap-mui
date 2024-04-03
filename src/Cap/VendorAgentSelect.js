import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { MultiSelect } from '../Components';
import { fetchVendorAgents } from './APIs/request';
const defaultVendorAgent = ['TJCP', 'TWCP', 'MYCP', 'USCP'];
const useVendorAgent = () => useQuery(['VendorAgnet'], fetchVendorAgents, {
    staleTime: Infinity,
    placeholderData: defaultVendorAgent,
    retry: 3,
    select: (data) => {
        const vendorAgents = data?.content
            ?.map((d) => d?.vendoR_NO)
            ?.filter((agent, index, agents) => index === agents.indexOf(agent));
        const defaultAgents = defaultVendorAgent.filter((agent) => vendorAgents?.includes(agent));
        const nonDefaultAgents = vendorAgents?.filter((agent) => !defaultVendorAgent.includes(agent))
            .sort((a, b) => {
            if (a < b)
                return -1;
            return 1;
        }) ?? [];
        return [
            ...defaultAgents,
            ...nonDefaultAgents,
        ];
    },
});
export const VendorAgentSelect = (props) => {
    const { data } = useVendorAgent();
    return (_jsx(MultiSelect, { label: 'Agent', placeholder: 'ALL', tooltip: 'verticle', abbr: '...', sx: { width: '120px' }, ...props, menuItems: data, disabled: props.disabled }));
};
export default VendorAgentSelect;
