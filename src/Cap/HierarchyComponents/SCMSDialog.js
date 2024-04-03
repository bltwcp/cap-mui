import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, } from 'react';
import { Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSCMS, useSCMSList, useSCMSContext, } from './useHierarchy';
import { Select, } from '../../Components';
import { HierarchyBox } from '../Common';
export const SCMSDialog = (props) => {
    const [select, setSelect] = useState(props.value ?? []);
    const [defaultSelect, setDefaultSelect] = useState(props.value ?? []);
    const [highlight, setHighlight] = useState();
    const [currentData, setCurrentData] = useState({ item: [], block: [] });
    const [currentType, setCurrentType] = useState();
    const { setSavedItems } = useSCMSContext();
    const { data } = useSCMS(currentType?.uid);
    const { data: dataList } = useSCMSList();
    const typeList = useMemo(() => {
        if (dataList) {
            const typeList = dataList.map((scms) => ({ name: scms.name, uid: scms.uid }));
            setCurrentType(typeList[0]);
            return typeList;
        }
        return [];
    }, [dataList]);
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
    const handleSCMSTypeSelect = (scmsType) => {
        if (scmsType) {
            const type = typeList.find((type) => type.name === scmsType);
            setCurrentType(type);
        }
    };
    return (_jsxs(Dialog, { fullWidth: true, maxWidth: 'lg', open: props.display, onClose: handleCloseDialog, sx: { overflowY: 'hidden', }, children: [_jsxs(DialogTitle, { sx: { fontSize: '16px', }, children: [_jsx("span", { children: "Supply Chain" }), _jsx("span", { style: { position: 'absolute', right: '20px', top: '15px', }, children: _jsx(CloseIcon, { onClick: handleCloseDialog, sx: { cursor: 'pointer', } }) })] }), _jsxs(DialogContent, { children: [_jsx(Select, { label: 'SCMS Type', menuItems: typeList.map((scms) => scms.name), initialSelected: 'Merchandise', onChange: handleSCMSTypeSelect, sx: { width: '180px', marginBottom: '10px', } }), _jsxs(Grid, { container: true, spacing: 0.5, children: [currentData?.block.map((block) => {
                                return (_jsx(Grid, { item: true, xs: 12 / currentData.block.length ?? 1, children: _jsx(Typography, { variant: 'body1', children: block.title }) }, `scms_${block.title}`));
                            }), currentData?.block.map((block, index) => {
                                return (_jsx(Grid, { item: true, xs: 12 / (currentData.block.length ?? 1), children: _jsx(HierarchyBox, { type: block.key, items: currentData.items.filter((item) => item.text.substring(0, 3).toUpperCase() === block.title.toUpperCase()), selected: select, disallowClickOff: true, highlight: highlight, onItemSelect: handleItemSelect, onItemHighlight: handleItemHighlight, sx: { height: '20vh', border: '1px solid #999', } }) }, `scms_item_${index}`));
                            }), currentData?.block.map((block, index) => {
                                return (_jsx(Grid, { item: true, xs: 12 / (currentData.block.length ?? 1), children: _jsx(HierarchyBox, { type: block.key, items: select.filter((item) => item.text.substring(0, 3).toUpperCase() === block.title.toUpperCase()), selected: select, disallowClickOff: false, onItemSelect: handleItemRemove, onItemHighlight: handleItemHighlight, sx: { height: '20vh', border: '1px solid #999', } }) }, `scms_select_${index}`));
                            })] })] }), _jsx(DialogActions, { children: _jsx(Button, { onClick: handleSelectComplete, sx: { width: '100%' }, children: "Send" }) })] }));
};
SCMSDialog.defaultProps = {
    display: false,
    selected: [],
};
