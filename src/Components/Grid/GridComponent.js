import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import Checkbox from '../Checkbox';
import { Button } from '../mui';
export const DialogColumnSHDialog = (props) => {
    const [showhides, setShowHides] = useState(props.showhides ?? []);
    useEffect(() => {
        setShowHides(props.showhides);
    }, [props.showhides]);
    const handleSHChange = (index, check) => {
        const newSHs = showhides.map((sh, i) => i === index ? check : sh);
        setShowHides(newSHs);
    };
    const handleOk = () => {
        props.onClose();
        let shChanged = {};
        showhides.forEach((sh, index) => {
            if (sh !== props.showhides[index])
                shChanged[index] = sh;
        });
        props.onComplete(shChanged);
    };
    return (_jsxs(Dialog, { onClose: props.onClose, open: props.open, maxWidth: 'md', children: [_jsx(DialogTitle, { children: "Show/Hide Columns" }), _jsx(DialogContent, { children: props.columns.map((column, index) => {
                    if (column === '')
                        return undefined;
                    return (_jsx("div", { children: _jsx(Checkbox, { label: column, defaultChecked: props.showhides[index], onChange: (check) => handleSHChange(index, check) }) }, `grid_showhide_${index}_${column}`));
                }).filter((v) => v) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: handleOk, color: 'primary', children: "OK" }) })] }));
};
