import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback, } from 'react';
import { useSCMS, useSCMSList, hierarchyContext, allHierarchyItems, } from './useHierarchy';
import { TextInput, tipMsg, IconButton, } from '../../Components';
import { SCMSDialog } from './SCMSDialog';
const label = 'SCMS';
export const SCMSComponent = (props) => {
    const [savedSCMSItems, setSavedSCMSItems] = useState([]);
    const [parseSCMSTypeUID, setParseSCMSTypeUID] = useState('');
    const [selected, setSelected] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [inputStr, setInputStr] = useState(props.defaultSelected ?? '');
    const { data: scmsList } = useSCMSList();
    const { data: scmsData } = useSCMS(parseSCMSTypeUID);
    useEffect(() => {
        if (!inputStr || inputStr.length === 0 || savedSCMSItems.length === 0) {
            setSelected([]);
            return;
        }
        const splits = inputStr.split(',').map((str) => str.trim());
        const parsedItems = splits.map((str) => savedSCMSItems.find((item) => item.text.toUpperCase() === str.toUpperCase()))
            .filter((item, index, items) => item && index === items.indexOf(item));
        setSelected(parsedItems);
    }, [inputStr, savedSCMSItems]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (scmsData && scmsData.items && scmsData.items.length > 0) {
            addSavedSCMSItems(scmsData.items);
        }
    }, [scmsData]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (scmsList) {
            const index = scmsList.map((typelist) => typelist.uid).indexOf(parseSCMSTypeUID) + 1;
            if (index > 0 && scmsData?.items.length === 0)
                return;
            if (index < scmsList.length)
                setParseSCMSTypeUID(scmsList[index].uid);
        }
    }, [scmsList, scmsData]); // eslint-disable-line react-hooks/exhaustive-deps
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
    const addSavedSCMSItems = (items) => {
        setSavedSCMSItems(allHierarchyItems(savedSCMSItems, items));
    };
    return (_jsxs(hierarchyContext.Provider, { value: { savedItems: savedSCMSItems, setSavedItems: addSavedSCMSItems }, children: [_jsx(TextInput, { label: label, placeholder: 'none selected', value: inputStr, onChange: handleInputChange, tooltipFn: () => tipMsg(selected.map((s) => s.text), props.tooltip ?? 'horizontal', '', 'scms'), sx: {
                    width: '200px',
                    ...props.sx
                }, disabled: props.disabled, clearable: true }), _jsx(IconButton, { startIcon: _jsx("img", { src: `${process.env.PUBLIC_URL}/target.png`, width: '16px', height: '16px', alt: label }), onClick: handleShowSelectDialog, disabled: props.disabled }), _jsx(SCMSDialog, { value: selected, display: showDialog, onClose: handleCloseSelectDialog, onComplete: handleDialogInput })] }));
};
SCMSComponent.defaultProps = {
    defaultSelected: 'SC3 TRADING CO, SC4 WHOLESALE CO',
    disabled: false,
    tooltip: 'verticle',
};
export default SCMSComponent;
