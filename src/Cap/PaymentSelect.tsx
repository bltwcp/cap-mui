import { MultiSelect } from '../Components'
import { CapMultiSelectProps } from './Common'

const defaultPayments = ['Paid', 'Unpaid']

export const PaymentSelect = (props: CapMultiSelectProps) => {
    return (<MultiSelect
        label='Payment'
        placeholder='ALL'
        tooltip='verticle'
        abbr='...'
        sx={{width: '120px'}}
        { ...props }
        menuItems={defaultPayments}
    />)
}

export default PaymentSelect