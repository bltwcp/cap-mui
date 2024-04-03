import { useQuery } from '@tanstack/react-query'

import { MultiSelect } from '../Components'
import { CapMultiSelectProps } from './Common'
import { fetchVendorAgents } from './APIs/request'

const defaultVendorAgent = ['TJCP', 'TWCP', 'MYCP', 'USCP']

const useVendorAgent = () => useQuery(['VendorAgnet'], fetchVendorAgents, {
    staleTime: Infinity,
    placeholderData: defaultVendorAgent,
    retry: 3,
    select: (data) => {
        const vendorAgents = data?.content
            ?.map((d: any) => d?.vendoR_NO)
            ?.filter((agent: string, index: number, agents: string[]) => index === agents.indexOf(agent))
        const defaultAgents = defaultVendorAgent.filter((agent) => vendorAgents?.includes(agent))
        const nonDefaultAgents = vendorAgents?.filter((agent: string) => !defaultVendorAgent.includes(agent))
            .sort((a: string, b: string) => {
                if (a < b)
                    return -1
                return 1
            }) ?? []
        return [
            ...defaultAgents,
            ...nonDefaultAgents,
        ]
    },
})

export const VendorAgentSelect = (props: CapMultiSelectProps) => {
    const { data } = useVendorAgent()

    return (<MultiSelect
        label='Agent'
        placeholder='ALL'
        tooltip='verticle'
        abbr='...'
        sx={{width: '120px'}}
        { ...props }
        menuItems={data}
        disabled={props.disabled}
    />)
}

export default VendorAgentSelect