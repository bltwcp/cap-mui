import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, } from 'react';
import { Select, TextInput, } from '../Components';
export const SearchOption = (props) => {
    const { onChange } = props;
    const [topic, setTopic] = useState('');
    const [searchString, setSearchString] = useState('');
    useEffect(() => {
        const selectedTopic = topic === '　' ? '' : topic;
        onChange && onChange(selectedTopic, searchString);
    }, [topic, searchString]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleItemChange = (topic) => setTopic(topic ?? '');
    const handleSearchStringChange = (search) => setSearchString(search ?? '');
    const menuItems = [
        props.emptyOption ? '　' : undefined,
        ...(props.menuItems ?? [])
    ].filter((item) => item);
    return (_jsxs(_Fragment, { children: [_jsx(Select, { label: 'Search Option', menuItems: menuItems, disabled: props.disabled, onChange: handleItemChange, clearable: true }), _jsx(TextInput, { onChange: handleSearchStringChange, sx: { marginLeft: '2px' } })] }));
};
export default SearchOption;
