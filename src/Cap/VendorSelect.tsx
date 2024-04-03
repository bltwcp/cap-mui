import { useQuery } from '@tanstack/react-query'

import { MultiSelect } from '../Components'
import { CapMultiSelectProps } from './Common'
import { fetchVendors } from './APIs/request'

const useVendor = (
    pHierarchies: string[],
    agents: string[],
    orderTypes: string[],
    payments: string[]
) => useQuery(
    ['Vendor', pHierarchies, agents, orderTypes, payments],
    () => fetchVendors(pHierarchies, agents, orderTypes, payments),
    {
        staleTime: Infinity,
        initialData: [],
        select: (data) => data?.content?.map((d: any) => d?.name),
        retry: 0,
    }
)

export type VendorSelectProps = CapMultiSelectProps & {
    pHierarchies: string[]
    agents: string[]
    orderTypes: string[]
    payments: string[]
}

export const VendorSelect = (props: VendorSelectProps) => {
    const { data } = useVendor(props.pHierarchies, props.agents, props.orderTypes, props.payments)

    return (<MultiSelect
        label='Vendor'
        placeholder='ALL'
        tooltip='verticle'
        abbr='...'
        sx={{ width: '150px' }}
        {...props}
        menuItems={data}
    />)
}

export default VendorSelect