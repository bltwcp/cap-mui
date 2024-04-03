import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, } from 'react';
import { Typography, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Popover, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '../../Components';
import { HierarchyBox } from '../Common';
export const HierarchyBaseDialog = (props) => {
    const searchInputRef = useRef(null);
    const [defaultSelect, setDefaultSelect] = useState(props.value ?? []);
    const [select, setSelect] = useState(props.value ?? []);
    const [highlight, setHighlight] = useState();
    const [currentData, setCurrentData] = useState({ item: [], block: [] });
    const [showPopover, setShowPopover] = useState(false);
    const [popoverContent, setPopoverContent] = useState([]);
    const [searchStr, setSearchStr] = useState('');
    const [searchIDArray, setSearchIDArray] = useState('');
    const { savedItems, setSavedItems } = props.useHierarchyContext();
    const { data } = props.useHierarchy(highlight ? [...highlight.parentHierarchy, highlight.id].join(',') : '1');
    const { data: tempData } = props.useHierarchy(searchIDArray);
    const { data: itemData } = props.useHierarchyItem(searchStr);
    useEffect(() => {
        if (props.value && props.value.length > 0 && props.value.length === defaultSelect.length) {
            const same = props.value.map((value, index) => value.uid.toUpperCase() === defaultSelect[index].uid.toUpperCase())
                .reduce((accu, curr) => accu && curr, true);
            if (same)
                return;
        }
        setSelect(props.value);
        setDefaultSelect(props.value);
    }, [props.value]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (data && data.items && data.items.length > 0) {
            setCurrentData(data);
            setSavedItems(data.items);
        }
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (tempData && tempData.items && tempData.items.length > 0) {
            setSavedItems(tempData.items);
        }
    }, [tempData]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        let items = [];
        if (!itemData)
            return;
        if (Array.isArray(itemData)) { // PH
            items = itemData?.map((item) => {
                const savedItem = props.findItem(savedItems, item);
                if (savedItem)
                    return savedItem;
                setSearchIDArray(props.parseIDArray(savedItems, [item]));
                return undefined;
            }).filter((v) => v);
        }
        else { // CH
            const saveItem = props.findItem(savedItems, itemData);
            if (saveItem)
                items.push(saveItem);
            else
                setSearchIDArray(props.parseIDArray(savedItems, itemData));
        }
        if (items.length > 0) {
            const same = popoverContent.length === items.length &&
                popoverContent.map((content, index) => content.uid.toUpperCase() === items[index].uid.toUpperCase())
                    .reduce((accu, curr) => accu && curr, true);
            if (same)
                return;
            setPopoverContent(items);
            setShowPopover(true);
        }
    }, [itemData, savedItems]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleItemSelect = (item, checked) => {
        if (checked) {
            const newSelect = [...select, item].filter((s, index, ss) => index === ss.indexOf(s));
            setSelect(newSelect);
        }
        else {
            const newSelect = select.filter((s) => s !== item);
            setSelect(newSelect);
        }
    };
    const handleItemRemove = (item, checked) => {
        const newSelect = select.filter((s) => s !== item);
        setSelect(newSelect);
    };
    const handleItemHighlight = (item) => {
        setHighlight(item);
    };
    const handleCloseDialog = () => {
        props.onClose && props.onClose();
    };
    const handleSelectComplete = () => {
        props.onComplete && props.onComplete(select);
        handleCloseDialog();
    };
    const handleSearchTextChange = (value) => {
        setSearchStr(value);
    };
    const handlePopoverClose = () => {
        setShowPopover(false);
    };
    const handlePopoverSelect = (item) => {
        const newSelect = [item, ...select].filter((s, index, ss) => index === ss.indexOf(s));
        setSelect(newSelect);
        setShowPopover(false);
    };
    return (_jsxs(Dialog, { fullWidth: true, maxWidth: 'lg', open: props.display, onClose: handleCloseDialog, sx: { overflowY: 'hidden', }, children: [_jsxs(DialogTitle, { sx: { fontSize: '16px', }, children: [_jsx("span", { children: props.label }), _jsxs("span", { style: { position: 'absolute', right: '20px', top: '15px', }, children: [_jsx(TextInput, { ref: searchInputRef, onChange: handleSearchTextChange, sx: { width: '150px', } }), searchInputRef.current && _jsx(Popover, { open: showPopover, anchorEl: searchInputRef.current, onClose: handlePopoverClose, anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, disableAutoFocus: true, disableEnforceFocus: true, children: popoverContent?.map((content, index) => {
                                    return (_jsx(Button, { onClick: () => handlePopoverSelect(content), children: content.text }, `hierarchy_popover_${index}_${content.text}`));
                                }) }), _jsx(SearchIcon, { sx: { marginRight: '50px', } }), _jsx(CloseIcon, { onClick: handleCloseDialog, sx: { cursor: 'pointer', } })] })] }), _jsx(DialogContent, { children: _jsxs(Grid, { container: true, spacing: 0.5, children: [currentData?.block.map((block) => {
                            return (_jsx(Grid, { item: true, xs: 12 / currentData.block.length ?? 1, children: _jsx(Typography, { sx: { fontSize: '13px' }, children: block.title }) }, `hierarchy_${block.title}`));
                        }), currentData?.block.map((block, index) => {
                            return (_jsx(Grid, { item: true, xs: 12 / (currentData.block.length ?? 1), children: _jsx(HierarchyBox, { type: block.key, items: currentData.items.filter((item) => item.parentHierarchy.length === index), selected: select, disallowClickOff: true, highlight: highlight, onItemSelect: handleItemSelect, onItemHighlight: handleItemHighlight, sx: { height: '30vh', border: '1px solid #999', } }) }, `hierarchy_item_${index}`));
                        }), currentData?.block.map((block, index) => {
                            return (_jsx(Grid, { item: true, xs: 12 / (currentData.block.length ?? 1), children: _jsx(HierarchyBox, { type: block.key, items: select.filter((item) => item.parentHierarchy.length === index), selected: select, disallowClickOff: false, onItemSelect: handleItemRemove, onItemHighlight: handleItemHighlight, sx: { height: '20vh', border: '1px solid #999', } }) }, `hierarchy_select_${index}`));
                        })] }) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: handleSelectComplete, sx: { width: '100%' }, children: "Send" }) })] }));
};
