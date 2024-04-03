import { useQuery } from '@tanstack/react-query'

import { MultiSelect } from '../Components'
import { CapMultiSelectProps } from './Common'
import { fetchPOStage } from './APIs/request'

const defaultPOStage = ['Draft', 'Review', 'Working']

const usePOStage = () => useQuery(['POStage'], fetchPOStage, {
    staleTime: Infinity,
    initialData: defaultPOStage,
    retry: 0,
})

export const POStageSelect = (props: CapMultiSelectProps) => {
    const { data } = usePOStage()

    return (<MultiSelect
        label='PO Stage'
        placeholder='ALL'
        tooltip='verticle'
        abbr='...'
        sx={{width: '130px'}}
        {...props}
        menuItems={data}
    />)
}

export default POStageSelect