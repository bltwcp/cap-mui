import { useState, useEffect, } from 'react'

import { MultiSelect, HierarchySelectItem, } from '../Components'
import { HierarchyItemInterface, useVendorTypes, } from './HierarchyComponents/useHierarchy'

interface VendorTypeSelectProps {
    defaultExpendLevel?: number
    disabled?: boolean
    onChange?: (values: HierarchyItemInterface[]) => void
}

export const VendorTypeSelect = (props: VendorTypeSelectProps) => {
    const { data: rawVendorTypes } = useVendorTypes()
    const [vendorTypes, setVendorTypes] = useState<HierarchySelectItem[]>([])

    useEffect(() => {
        const expandLevel = props.defaultExpendLevel ?? 2
        const newVendorTypes = rawVendorTypes?.map((vendorType): HierarchySelectItem => {
            const parent = rawVendorTypes.find((raw) => raw.uid === vendorType.parent)
            return {
                name: vendorType.text,
                parent: parent?.text,
                expand: vendorType.level < expandLevel,
            }
        }) ?? []
        setVendorTypes(newVendorTypes)
    }, [rawVendorTypes]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleOnChange = (values: string[]) => {
        props.onChange && props.onChange(values.map((value) => {
            return rawVendorTypes?.find((vendorType) => vendorType.text === value)
        }).filter((v) => v) as HierarchyItemInterface[])
    }

    return (<MultiSelect
        label='Vendor Type'
        menuItems={vendorTypes}
        placeholder='ALL'
        placeholderColor='black'
        onChange={handleOnChange}
        disabled={props.disabled}
    />)
}