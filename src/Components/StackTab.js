import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, forwardRef, useEffect, } from 'react';
import { Stack as MuiStack, Paper, Box, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { hideSX, } from './TabPanel';
import { StackTabBar, Typography, } from './mui';
import { defaultValue, triOp } from './Utils';
const DefaultHideMethod = 'none';
export const StackTabs = forwardRef((props, ref) => {
    const [currentTab, setCurrentTab] = useState(defaultValue(props.currentTab, props.initialTab, 0));
    const switchCurrentTab = (tabIndex) => {
        setCurrentTab(triOp(tabIndex === currentTab, -1, tabIndex));
    };
    useEffect(() => {
        props.onTabChange && props.onTabChange(currentTab);
    }, [currentTab]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.currentTab && props.currentTab !== currentTab)
            setCurrentTab(props.currentTab);
    }, [props.currentTab]); // eslint-disable-line react-hooks/exhaustive-deps
    const baseSX = () => {
        if (props.anchorEl)
            return { width: '100%', position: 'absolute', top: props.anchorEl.getBoundingClientRect().bottom, bottom: 0, };
        return { width: '100%', };
    };
    const expandIcon = (index) => {
        if (currentTab === index)
            return _jsx(RemoveIcon, {});
        return _jsx(AddIcon, {});
    };
    const hideMethod = defaultValue(props.hideMethod, DefaultHideMethod);
    const noneMode = (index) => {
        if (index === currentTab)
            return React.Children.toArray(props.children)[index];
        return _jsx(_Fragment, {});
    };
    const displayChild = (index) => {
        if (!props.children)
            return _jsx("span", { "data-testid": 'stackTab' });
        if (hideMethod === 'none')
            return noneMode(index);
        return (_jsx(Box, { sx: hideSX(currentTab === index, hideMethod), "data-testid": 'stackTab', children: React.Children.toArray(props.children)[index] }));
    };
    return (_jsx("div", { ref: ref, style: baseSX(), children: _jsx(MuiStack, { spacing: 0, children: props.tabs.map((tab, index) => (_jsxs(Paper, { children: [_jsxs(StackTabBar, { onClick: () => switchCurrentTab(index), sx: props.sx, children: [expandIcon(index), _jsx(Typography, { variant: 'body1', sx: props.tabSx, children: tab })] }), displayChild(index)] }, `stacktab_${index}_${tab}`))) }) }));
});
