import axios from 'axios';
const api_basepath = process.env.REACT_APP_CAPMUI_BASEPATH ?? '';
const capapi_token = { headers: { 'token': process.env.REACT_APP_CAPMUI_APITOKEN ?? '' } };
export const fetchPortOfLoading = async () => {
    const { data } = await axios.get(`${api_basepath}/Parameter/GetPorts`, capapi_token);
    return data;
};
export const fetchVendorAgents = async () => {
    const { data } = await axios.get(`${api_basepath}/Vendor/Agent`, capapi_token);
    return data;
};
export const fetchVendors = async (pHierarchies, agents, orderTypes, payments) => {
    const { data } = await axios.post(`${api_basepath}/Common/Vendors`, {
        ...capapi_token,
        pHierarchies: pHierarchies,
        agents: agents,
        orderTypes: orderTypes,
        payments: payments,
    });
    return data;
};
export const fetchPOStage = async () => {
    const { data } = await axios.post(`${api_basepath}/Common/POStage`, capapi_token);
    return data;
};
export const fetchBOLStage = async () => {
    const { data } = await axios.post(`${api_basepath}/Common/BOLStage`, capapi_token);
    return data;
};
export const fetchPHierarchy = async (idArray) => {
    const { data } = await axios.get(`${api_basepath}/PHierarchy/GetSelectItemsByArray?selectStringArray=${idArray}`);
    return data;
};
export const fetchPHItem = async (itemName) => {
    const { data } = await axios.get(`${api_basepath}/PHierarchy/GetItemHierarchyByname?itemName=${itemName}`, capapi_token);
    return data;
};
export const fetchCHierarchy = async (idArray) => {
    const { data } = await axios.get(`${api_basepath}/CHierarchy/GetSelectItemsByArray?selectStringArray=${idArray}`);
    return data;
};
export const fetchCHItem = async (itemName) => {
    const { data } = await axios.get(`${api_basepath}/CHierarchy/GetItemByName?name=${itemName}`, capapi_token);
    return data;
};
export const fetchSCMS = async (typeuid) => {
    const { data } = await axios.get(`${api_basepath}/SCMS/GetSCMSListForReact?strSCMSTypeUID=${typeuid}`);
    return data;
};
export const fetchSCMSList = async () => {
    const { data } = await axios.get(`${api_basepath}/SCMS/getSCMSTypeList`);
    return data;
};
export const fetchVendorTypes = async () => {
    const { data } = await axios.get(`${api_basepath}/Vendor/VendorTypeList`);
    return data;
};
