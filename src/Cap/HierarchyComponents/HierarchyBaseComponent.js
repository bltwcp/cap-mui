import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback, } from 'react';
import { Button, } from '@mui/material';
import { hierarchyContext, allHierarchyItems, } from './useHierarchy';
import { TextInput, tipMsg } from '../../Components';
export const HierarchyComponent = (props) => {
    const [savedItems, setSavedItems] = useState([]);
    const [savedNonItems, setSavedNonItems] = useState([]);
    const [parseItemName, setParseItemName] = useState('');
    const [parseIDArray, setParseIDArray] = useState('');
    const [selected, setSelected] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [inputStr, setInputStr] = useState(props.defaultSelected ?? '');
    const { data: hData } = props.useHierarchy(parseIDArray);
    const { data: itemData } = props.useHierarchyItem(parseItemName);
    useEffect(() => {
        if (!inputStr || inputStr.length === 0 || savedItems.length === 0) {
            setSelected([]);
            return;
        }
        const splits = inputStr.split(',').map((str) => str.trim());
        const notFoundItems = splits.map((str) => savedNonItems.includes(str) || savedItems?.find((item) => item.text.toUpperCase() === str.toUpperCase() || item.name?.toUpperCase() === str.toUpperCase())
            ? undefined
            : str)
            .filter((item, index, items) => item && index === items.indexOf(item));
        if (notFoundItems.length > 0) {
            setParseItemName(notFoundItems[0]);
            return;
        }
        const parsedItems = splits.map((str) => savedItems.find((item) => item.text.toUpperCase() === str.toUpperCase() || item.name?.toUpperCase() === str.toUpperCase()))
            .filter((item, index, items) => item && index === items.indexOf(item));
        setSelected(parsedItems);
    }, [inputStr, savedItems]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        //console.log(parseItemName, itemData)
        if (!itemData || !parseItemName)
            return;
        if (itemData.length === 0 && parseItemName !== '') {
            setSavedNonItems(savedNonItems.concat(parseItemName));
            return;
        }
        //console.log(savedItems, itemData, props.parseHIDArray(saveditems, itemData))
        setParseIDArray(props.parseIDArray(savedItems, itemData));
        const matchSavedItem = savedItems.find((item) => item.uid.toUpperCase() === itemData[0].uid.toUpperCase());
        if (matchSavedItem && matchSavedItem.name === undefined) {
            const newSaved = savedItems.map((item) => item.uid.toUpperCase() === itemData[0].uid.toUpperCase()
                ? ({
                    ...item,
                    name: itemData[0].name,
                })
                : item);
            setSavedItems(newSaved);
        }
    }, [itemData, savedItems]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        //console.log(hData)
        if (hData && hData.items && hData.items.length > 0) {
            //addSavedHItems(hData[props.baseItem])
            addSavedHItems(hData.items);
        }
    }, [hData]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.onChange && props.onChange(selected);
    }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleInputChange = (input) => {
        setInputStr(input);
    };
    const handleDialogInput = (items) => {
        setSelected(items);
        setInputStr(items.map((item) => item.text).join(','));
    };
    const handleShowSelectDialog = useCallback(() => setShowDialog(true), []);
    const handleCloseSelectDialog = useCallback(() => setShowDialog(false), []);
    const addSavedHItems = (items) => {
        setSavedItems(allHierarchyItems(savedItems, items));
    };
    return (_jsxs(hierarchyContext.Provider, { value: { savedItems: savedItems, setSavedItems: addSavedHItems }, children: [_jsx(TextInput, { label: props.label, placeholder: 'none selected', value: inputStr, onChange: handleInputChange, tooltipFn: () => tipMsg(selected.map((s) => s.text), props.tooltip ?? 'horizontal', '', 'hierarchy'), sx: {
                    width: '200px',
                    ...props.sx
                }, disabled: props.disabled, clearable: true }), _jsx(Button, { startIcon: _jsx("img", { src: `${process.env.PUBLIC_URL}/target.png`, width: '16px', height: '16px', alt: props.label }), onClick: handleShowSelectDialog, disabled: props.disabled, sx: {
                    padding: '0px',
                    marginX: '2px',
                    minWidth: '26px',
                    width: '26px',
                    height: '26px',
                    '& .MuiButton-startIcon': { marginX: '0px', },
                    ...props.buttonSX,
                } }), props.Dialog(selected, showDialog, handleCloseSelectDialog, handleDialogInput)] }));
};
