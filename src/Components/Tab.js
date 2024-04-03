import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo, forwardRef } from 'react';
import { Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { nanoid } from 'nanoid';
import { StyledMuiTabs, Tab } from './mui';
import { defaultValue, } from './Utils';
export const Tabs = forwardRef((props, ref) => {
    const [tabs, setTabs] = useState(props.tabs);
    const [currentTab, setCurrentTab] = useState(defaultValue(props.currentTab, 0));
    const uid = useMemo(() => nanoid(), []);
    useEffect(() => {
        setTabs(props.tabs);
    }, [props.tabs]);
    useEffect(() => {
        props.onTabChange && props.onTabChange(currentTab);
    }, [currentTab]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.currentTab !== undefined && props.currentTab !== currentTab)
            setCurrentTab(props.currentTab);
    }, [props.currentTab]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleTabChange = (event, newValue) => setCurrentTab(newValue);
    const handleClose = (event, index) => {
        event.stopPropagation();
        if (props.onTabClose) // user handle tab close event
            props.onTabClose(index);
        else { // default tab close flow
            const newTabs = tabs.filter((t, i) => i !== index);
            let newCurrentTab = currentTab;
            if (currentTab >= newTabs.length)
                newCurrentTab = newTabs.length - 1;
            setTabs(newTabs);
            setCurrentTab(newCurrentTab);
        }
    };
    if (currentTab < tabs.length)
        return (_jsx("div", { style: {
                overflowY: 'hidden',
                overflowX: 'auto',
            }, children: _jsx(StyledMuiTabs, { ref: ref, value: currentTab, onChange: handleTabChange, variant: 'scrollable', scrollButtons: 'auto', sx: props.sx, children: tabs.map((tab, index) => {
                    const isEllipsis = props.MaxTabLength && tab.length > props.MaxTabLength;
                    const tabLabel = isEllipsis ? tab.substring(0, props.MaxTabLength) + '...' : tab;
                    const tooltipTitle = isEllipsis ? tab : '';
                    const iconProps = props.freezeTabs && props.freezeTabs <= index
                        ? {
                            icon: (_jsx(CloseIcon, { sx: { fontSize: '13px', }, onClick: (event) => handleClose(event, index) })),
                        }
                        : {};
                    return (_jsx(Tooltip, { title: tooltipTitle, children: _jsx(Tab, { ...iconProps, iconPosition: 'end', label: tabLabel, id: `${index}`, sx: props.tabSx }) }, `tab_${uid}_${index}`));
                }) }) }));
    return _jsx(_Fragment, {});
});
