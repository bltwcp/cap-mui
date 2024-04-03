import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { MultiSelect } from '../Components';
import { fetchPOStage } from './APIs/request';
const defaultBOLStage = ['Processing', 'Importing', 'Receiving', 'AP Review', 'Complete'];
const useBOLStage = () => useQuery(['BOLStage'], fetchPOStage, {
    staleTime: Infinity,
    initialData: defaultBOLStage,
    retry: 0,
});
export const BOLStageSelect = (props) => {
    const { data } = useBOLStage();
    return (_jsx(MultiSelect, { label: 'BOL Stage', placeholder: 'ALL', tooltip: 'verticle', abbr: '...', sx: { width: '130px' }, ...props, menuItems: data }));
};
export default BOLStageSelect;
