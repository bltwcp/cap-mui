import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, } from 'react';
import { MultiSelect, } from '../Components';
import { useVendorTypes, } from './HierarchyComponents/useHierarchy';
export const VendorTypeSelect = (props) => {
    const { data: rawVendorTypes } = useVendorTypes();
    const [vendorTypes, setVendorTypes] = useState([]);
    useEffect(() => {
        const expandLevel = props.defaultExpendLevel ?? 2;
        const newVendorTypes = rawVendorTypes?.map((vendorType) => {
            const parent = rawVendorTypes.find((raw) => raw.uid === vendorType.parent);
            return {
                name: vendorType.text,
                parent: parent?.text,
                expand: vendorType.level < expandLevel,
            };
        }) ?? [];
        setVendorTypes(newVendorTypes);
    }, [rawVendorTypes]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleOnChange = (values) => {
        props.onChange && props.onChange(values.map((value) => {
            return rawVendorTypes?.find((vendorType) => vendorType.text === value);
        }).filter((v) => v));
    };
    return (_jsx(MultiSelect, { label: 'Vendor Type', menuItems: vendorTypes, placeholder: 'ALL', placeholderColor: 'black', onChange: handleOnChange, disabled: props.disabled }));
};
