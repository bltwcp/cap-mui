import { useQuery } from '@tanstack/react-query'

import { MultiSelect } from '../Components'
import { CapMultiSelectProps } from './Common'

const defaultOrderType = [
    'All (Merchandise)', 'REPLENISHMENT', 'FIRST ORDER', 'SAMPLE', 'OTHERS', 'TRADING', 'TS ORDER', 'LIF ORDER', 'SUPPLY', 'EXPENSE', 'MANUFACTURING', 'TRANSFER'
]

const useOrderType = () => useQuery(['OrderType'], {
    staleTime: Infinity,
    initialData: defaultOrderType,
    retry: 0,
})

export const OrderTypeSelect = (props: CapMultiSelectProps) => {
    const { data } = useOrderType()

    return (<MultiSelect
        label='Order Type'
        placeholder='ALL'
        tooltip='verticle'
        abbr='...'
        sx={{ width: '150px' }}
        { ...props }
        menuItems={data}
    />)
}

export default OrderTypeSelect