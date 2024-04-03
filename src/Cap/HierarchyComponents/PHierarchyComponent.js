import { jsx as _jsx } from "react/jsx-runtime";
import { usePHierarchy, usePHierarchyItem, usePHContext, } from './useHierarchy';
import { HierarchyComponent, } from '../HierarchyComponents/HierarchyBaseComponent';
import { HierarchyBaseDialog } from './HierarchyBaseDialog';
const label = 'P Hierarchy';
const parseIDArray = (savedItems, itemData) => {
    const pcategory = savedItems.find((ph) => ph.uid.toUpperCase() === itemData[0].pCategoryUID?.toUpperCase());
    const pindustry = savedItems.find((ph) => ph.uid.toUpperCase() === itemData[0].pIndustryUID?.toUpperCase());
    const pdivision = savedItems.find((ph) => ph.uid.toUpperCase() === itemData[0].pDivisionUID?.toUpperCase());
    const psubdivision = savedItems.find((ph) => ph.uid.toUpperCase() === itemData[0].pSubdivisionUID?.toUpperCase());
    const ptype = savedItems.find((ph) => ph.uid.toUpperCase() === itemData[0].pTypeUID?.toUpperCase());
    const pclass = savedItems.find((ph) => ph.uid.toUpperCase() === itemData[0].pClassUID?.toUpperCase());
    return [pcategory?.id, pindustry?.id, pdivision?.id, psubdivision?.id, ptype?.id, pclass?.id]
        .filter((id) => id).join(',');
};
const findItem = (savedItems, itemData) => {
    return savedItems.find((savedItem) => itemData.uid.toUpperCase() === savedItem.uid.toUpperCase());
};
export const PHierarchyComponent = (props) => {
    const dialog = (selected, showDialog, handleCloseSelectDialog, handleDialogInput) => {
        return _jsx(HierarchyBaseDialog, { label: label, value: selected, display: showDialog, onClose: handleCloseSelectDialog, onComplete: handleDialogInput, useHierarchyContext: usePHContext, useHierarchy: usePHierarchy, useHierarchyItem: usePHierarchyItem, parseIDArray: parseIDArray, findItem: findItem });
    };
    return _jsx(HierarchyComponent, { ...props, label: label, Dialog: dialog, useHierarchy: usePHierarchy, useHierarchyItem: usePHierarchyItem, parseIDArray: parseIDArray });
};
PHierarchyComponent.defaultProps = {
    defaultSelected: 'Merchandise',
    disabled: false,
    tooltip: 'verticle',
};
export default PHierarchyComponent;
