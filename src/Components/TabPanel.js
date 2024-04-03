import { jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo, forwardRef, } from 'react';
import { nanoid } from 'nanoid';
import { defaultValue } from './Utils';
const displaySX = {
    height: '100%',
};
const hiddenSX = {
    overflow: 'hidden',
    height: '0px',
};
const noDisplaySX = {
    display: 'none',
};
export const hideSX = (display, hideMethod) => {
    if (display)
        return displaySX;
    switch (hideMethod) {
        case 'hide':
            return hiddenSX;
        case 'nodisplay':
        default:
            return noDisplaySX;
    }
};
const TabPanel = (props) => {
    return (_jsx("div", { style: props.displayStyle, children: props.children }));
};
export const TabPanels = forwardRef((props, ref) => {
    const uid = useMemo(() => nanoid(), []);
    const hideMethod = defaultValue(props.hideMethod, 'hide');
    const renderTabContent = () => {
        if (hideMethod === 'none')
            return React.Children.toArray(props.children)[props.currentTab];
        return React.Children.toArray(props.children).map((panel, index) => (_jsx(TabPanel, { displayStyle: hideSX(props.currentTab === index, hideMethod), children: panel }, `panel_${uid}_${index}`)));
    };
    return (_jsx("div", { ref: ref, style: props.anchorEl
            ? { width: '100%', position: 'absolute', top: props.anchorEl.getBoundingClientRect().bottom, bottom: 0, }
            : { width: '100%', }, children: props.children && renderTabContent() }));
});
export default TabPanels;
