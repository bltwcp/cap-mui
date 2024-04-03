import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, forwardRef, } from 'react';
import { ListItemText, Tooltip, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { nanoid } from 'nanoid';
import { StyledMuiCheckbox, MenuItem, StyledMultiMuiSelect, InputLabel, FormControl, IconButton, } from './mui';
import { tipMsg, leadingLabel, triOp, or, } from './Utils';
export const MultiSelect = forwardRef((props, ref) => {
    const [values, setValues] = useState(props.initialSelected ?? []);
    const [displayValues, setDisplayValues] = useState([]);
    const [showTip, setShowTip] = useState(false);
    const [inSelect, setInSelect] = useState(false);
    const [selectableItems, setSelectableItems] = useState([]);
    const [expandItems, setExpandItems] = useState([]);
    const uid = useMemo(() => nanoid(), []);
    const itemHierarchies = useMemo(() => {
        if (!props.menuItems || props.menuItems.length === 0 || typeof props.menuItems[0] === 'string')
            return undefined;
        let hierarchies = {};
        let expandItems = [];
        props.menuItems.forEach((item) => {
            if (typeof item === 'string')
                return;
            if (item.parent) {
                const parentHierarchies = [...(hierarchies[item.parent] ?? []), item.parent];
                hierarchies[item.name] = parentHierarchies;
            }
            if (item.expand)
                expandItems.push(item.name);
        });
        setExpandItems(expandItems);
        return hierarchies;
    }, [props.menuItems]);
    useEffect(() => {
        if (!props.menuItems || props.menuItems.length === 0)
            return;
        const selectableItems = typeof props.menuItems[0] === 'string'
            ? props.menuItems
            : props.menuItems
                .filter((item) => or(typeof item === 'string', !item.parent, expandItems.includes(item.parent)))
                .map((item) => triOp(typeof item === 'string', item, item.name));
        setSelectableItems(selectableItems);
    }, [props.menuItems, expandItems]);
    useEffect(() => {
        const displays = (props.disabled ? props.selectedAtDisabled : values) ?? [];
        if (JSON.stringify(displayValues) !== JSON.stringify(displays))
            setDisplayValues(displays);
    }, [props.disabled, values]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        props.onChange && props.onChange(displayValues);
    }, [displayValues]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.value && JSON.stringify(props.value) !== JSON.stringify(values)) {
            setValues(props.value);
            //!props.disabled && props.onChange && props.onChange(props.value)
        }
    }, [props.value]); // eslint-disable-line react-hooks/exhaustive-deps
    const expandIcon = (itemName) => {
        if (!itemHierarchies || !itemName || itemName.length === 0)
            return;
        const hierarchy = itemHierarchies[itemName];
        const sx = { fontSize: '16px', marginLeft: `${hierarchy?.length * 15}px`, paddingRight: '4px', };
        const hasChild = Object.values(itemHierarchies).some((v) => v.some((vv) => vv === itemName));
        const expanded = expandItems.includes(itemName);
        if (hasChild) {
            if (expanded)
                return _jsx(RemoveIcon, { onClick: (e) => {
                        e.stopPropagation();
                        handleExpand(itemName, false);
                    }, sx: sx });
            else
                return _jsx(AddIcon, { onClick: (e) => {
                        e.stopPropagation();
                        handleExpand(itemName, true);
                    }, sx: sx });
        }
        else
            return _jsx("span", { style: { width: `${16 + (hierarchy?.length ?? 0) * 15}px`, paddingRight: '4px', } });
    };
    const handleExpand = (itemName, expand) => {
        if (expand)
            setExpandItems(expandItems.concat(itemName));
        else
            setExpandItems(expandItems.filter((item) => !isBranchOf(itemName, item) && itemName !== item));
    };
    const isHierarchyItems = () => {
        return props.menuItems && typeof props.menuItems[0] !== 'string';
    };
    const handleChange = (event) => {
        let newValues = event.target.value;
        if (event.target.value.length > values.length && isHierarchyItems()) { // add one && is hierarchy
            const operatingValue = event.target.value[event.target.value.length - 1];
            const menuItems = props.menuItems;
            const operatingItem = menuItems.find((item) => item.name === operatingValue);
            // in the following, it handle hierarchy checked relation
            // - if all childs are checked, the "checked parent" can represent all checked childs
            // - if any of child in a checked branch is unchecked, the branch should unchecked and all other sibiling childs should checked
            newValues = newValues.filter((value) => !isBranchOf(operatingValue, value));
            let item = menuItems.find((item) => item.name === operatingValue);
            while (item?.parent) {
                const itemParent = item?.parent;
                if (values.includes(itemParent)) { // branch is checked: remove branch value and add all its leaves without operatingValue
                    const negalects = newValues;
                    const allLeaves = menuItems.filter((menuItem) => (menuItem.parent === itemParent || operatingItem?.parent === menuItem.parent) &&
                        !isBranchOf(menuItem.name, operatingValue))
                        .map((menuItem) => menuItem.name)
                        .filter((leafItem) => !negalects.includes(leafItem));
                    newValues = values.concat(allLeaves)
                        .filter((value) => value !== itemParent);
                    break;
                }
                else { // branch is unchecked: add operatingItem
                    // need to check if all sibilings are checked => uncheck all sibilings and check the branch
                    const currentCheckeds = newValues;
                    const allSibiling = menuItems.filter((menuItem) => menuItem.parent === itemParent);
                    const allSibilingChecked = allSibiling.map((leave) => currentCheckeds.includes(leave.name)).reduce((accu, curr) => accu && curr, true);
                    if (allSibilingChecked) {
                        newValues.push(item.parent);
                        newValues = newValues.filter((value) => !allSibiling.some((sibiling) => sibiling.name === value));
                    }
                    item = menuItems.find((_item) => _item.name === itemParent);
                }
            }
        }
        newValues = newValues.sort((a, b) => {
            const aIndex = selectableItems.indexOf(a);
            const bIndex = selectableItems.indexOf(b);
            return aIndex - bIndex;
        });
        setValues(newValues);
    };
    const inputMsg = () => {
        let displayMsg = props.placeholder ?? '';
        if (displayValues.length > 0) {
            if (props.abbr && props.abbr === '...')
                displayMsg = displayValues.join(',');
            else
                displayMsg = `${displayValues.length} selected`;
        }
        return (_jsx("span", { children: displayMsg }));
    };
    const isBranchOf = (branch, leaf) => {
        if (branch === leaf)
            return false;
        if (props.menuItems && props.menuItems.length > 0 && typeof props.menuItems[0] !== 'string') {
            let leafParentName = props.menuItems.find((item) => item.name === leaf)?.parent;
            while (leafParentName) {
                if (leafParentName === branch)
                    return true;
                const refName = leafParentName;
                leafParentName = props.menuItems.find((item) => item.name === refName)?.parent;
            }
        }
        return false;
    };
    const isChecked = (item) => {
        return values.some((value) => value === item || isBranchOf(value, item));
    };
    const isIndeterminated = (item) => {
        return props.menuItems && typeof props.menuItems[0] !== 'string' &&
            !values.includes(item) &&
            values.some((value) => isBranchOf(item, value));
    };
    /*const isSelectabled = (item: string) => {
        return isHierarchyItems()
            ? ((props.menuItems as HierarchySelectItem[]).find((menuItem) => menuItem.name === item)?.selectabled ?? true)
            : ((props.menuItems as string[]).find((menuItem) => menuItem === item) ?? true)
    }*/
    return (_jsxs("span", { ref: ref, children: [leadingLabel(props.label ?? ''), _jsxs(FormControl, { children: [_jsx(InputLabel, { sx: {
                            color: props.disabled ? 'rgba(0, 0, 0, 0.38)' :
                                props.placeholderColor ?? 'black',
                        }, children: props.placeholder }, `${props.label}-label`), _jsx(Tooltip, { enterDelay: 300, leaveDelay: 200, title: tipMsg(displayValues, props.tooltip ?? 'verticle', props.placeholder ?? '', `mselect_${uid}`), open: showTip, arrow: true, children: _jsx(StyledMultiMuiSelect, { multiple: true, value: displayValues, onChange: handleChange, disabled: props.disabled, endAdornment: _jsx(IconButton, { role: 'close', onClick: () => setValues([]), disabled: props.disabled, children: _jsx(CloseIcon, {}) }), sx: props.sx, renderValue: inputMsg, onMouseEnter: () => props.tooltip && props.tooltip !== 'none' && !inSelect && setShowTip(true), onMouseLeave: () => props.tooltip && props.tooltip !== 'none' && setShowTip(false), onMouseDown: () => props.tooltip && props.tooltip !== 'none' && setShowTip(false), onOpen: () => setInSelect(true), onClose: () => {
                                setInSelect(false);
                                props.onChange && props.onChange(displayValues);
                            }, children: selectableItems.map((item) => (_jsxs(MenuItem, { value: item, sx: props.menuItemSx, children: [_jsx(StyledMuiCheckbox, { checked: isChecked(item), indeterminate: isIndeterminated(item) }), expandIcon(item), _jsx(ListItemText, { primary: item })] }, `${props.label}-item-${item}`))) }, `${props.label}-select`) }, `${props.label}-tooltip`)] })] }));
});
export default MultiSelect;
