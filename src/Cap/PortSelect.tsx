import { useQuery } from '@tanstack/react-query'

import { MultiSelect } from '../Components'
import { CapMultiSelectProps } from './Common'
import { fetchPortOfLoading } from './APIs/request'

const usePortOfLoading = () => useQuery(['PortOfLoading'], fetchPortOfLoading, {
    staleTime: Infinity,
    placeholderData: [],
    retry: 3,
    select: (data) => data?.content?.map((d: any) => d?.name),
})

export const PortSelect = (props: CapMultiSelectProps) => {
    const { data } = usePortOfLoading()

    return (<MultiSelect
        label='Port'
        placeholder='ALL'
        tooltip='verticle'
        abbr='...'
        sx={{width: '150px'}}
        {...props}
        menuItems={data}
    />)
}

export default PortSelect