import { jsx as _jsx } from "react/jsx-runtime";
import { useCHierarchy, useCHierarchyItem, useCHContext, } from './useHierarchy';
import { HierarchyComponent, } from '../HierarchyComponents/HierarchyBaseComponent';
import { HierarchyBaseDialog } from './HierarchyBaseDialog';
const label = 'C Hierarchy';
const parseIDArray = (savedItems, itemData) => {
    if (!itemData.group)
        return '';
    const cgroup = savedItems.find((ch) => ch.uid.toUpperCase() === itemData.group[0]?.uid?.toUpperCase());
    const cloc = savedItems.find((ch) => ch.uid.toUpperCase() === itemData.loc[0]?.uid?.toUpperCase());
    const ccorporation = savedItems.find((ch) => ch.uid.toUpperCase() === itemData.corporation[0]?.uid?.toUpperCase());
    const cbranch = savedItems.find((ch) => ch.uid.toUpperCase() === itemData.branch[0]?.uid?.toUpperCase());
    const cdc = savedItems.find((ch) => ch.uid.toUpperCase() === itemData.dc[0]?.uid?.toUpperCase());
    const cchannel = savedItems.find((ch) => ch.uid.toUpperCase() === itemData.channel[0]?.uid?.toUpperCase());
    return [cgroup?.id, cloc?.id, ccorporation?.id, cbranch?.id, cdc?.id, cchannel?.id]
        .filter((id) => id).join(',');
};
const findItem = (savedItems, itemData) => {
    const hierarchy = ['store', 'channel', 'dc', 'branch', 'corporation', 'loc', 'group']
        .filter((hierarchy) => itemData[hierarchy] && itemData[hierarchy].length > 0)[0];
    if (hierarchy)
        return savedItems.find((ch) => itemData[hierarchy][0].uid.toUpperCase() === ch.uid.toUpperCase());
    return undefined;
};
export const CHierarchyComponent = (props) => {
    const dialog = (selected, showDialog, handleCloseSelectDialog, handleDialogInput) => {
        return _jsx(HierarchyBaseDialog, { label: label, value: selected, display: showDialog, onClose: handleCloseSelectDialog, onComplete: handleDialogInput, useHierarchyContext: useCHContext, useHierarchy: useCHierarchy, useHierarchyItem: useCHierarchyItem, parseIDArray: parseIDArray, findItem: findItem });
    };
    return _jsx(HierarchyComponent, { ...props, label: label, Dialog: dialog, useHierarchy: useCHierarchy, useHierarchyItem: useCHierarchyItem, parseIDArray: parseIDArray });
};
CHierarchyComponent.defaultProps = {
    defaultSelected: 'CAP GROUP,CAP N. America,CAP Asia/Pacific',
    disabled: false,
    tooltip: 'verticle',
};
export default CHierarchyComponent;
