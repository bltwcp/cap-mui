import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPHierarchy, fetchPHItem, fetchCHierarchy, fetchCHItem, fetchSCMS, fetchSCMSList, fetchVendorTypes, } from '../APIs/request';
export const hierarchyContext = createContext({
    savedItems: [],
    setSavedItems: (_items) => { }
});
export const usePHContext = () => useContext(hierarchyContext);
export const useCHContext = () => useContext(hierarchyContext);
export const useSCMSContext = () => useContext(hierarchyContext);
const hierarchyQueryOptions = {
    staleTime: 300000,
    placeholderData: {
        block: [],
        items: [],
    },
    select: (data) => {
        let parentDictionary = {};
        let items = [];
        data.content?.block?.forEach((block) => {
            items.push(...data.content[block.name.toLowerCase()].map((item) => {
                let parentHierarchy = item.parent ? [...parentDictionary[item.parent], item.parent] : [];
                parentDictionary[item.id] = parentHierarchy;
                return {
                    ...item,
                    parentHierarchy,
                };
            }));
        });
        return {
            block: data.content?.block ?? [],
            items,
        };
    },
    retry: 3,
};
export const usePHierarchy = (idArray) => useQuery(['phierarchy', idArray], () => fetchPHierarchy(idArray ?? ''), hierarchyQueryOptions);
export const useCHierarchy = (idArray) => useQuery(['chierarchy', idArray], () => fetchCHierarchy(idArray ?? ''), hierarchyQueryOptions);
export const usePHierarchyItem = (itemName) => useQuery(['PHName', itemName ?? ''], () => fetchPHItem(itemName ?? ''), {
    staleTime: Infinity,
    select: (data) => data.content,
});
export const useCHierarchyItem = (itemName) => useQuery(['CHName', itemName ?? ''], () => fetchCHItem(itemName ?? ''), {
    staleTime: Infinity,
    select: (data) => data.content,
});
export const allHierarchyItems = (list1, list2) => {
    return list1.concat(list2.filter((item2) => !list1.some((item1) => item1.uid === item2.uid)));
};
export const useSCMS = (itemUID) => useQuery(['SCMS', itemUID], () => fetchSCMS(itemUID ?? ''), {
    staleTime: Infinity,
    placeholderData: {
        block: [],
        items: [],
    },
    select: (data) => {
        let items = [];
        data.content?.block?.forEach((block, index) => {
            items.push(...data.content.datas[index].data);
        });
        return {
            block: data.content?.block ?? [],
            items,
        };
    },
    retry: 3,
});
export const useVendorTypes = () => useQuery(['vendorType'], () => fetchVendorTypes(), {
    staleTime: Infinity,
    placeholderData: [],
    select: (data) => {
        let items = [];
        data.content?.forEach((vendorType, index) => {
            const parentItem = vendorType.isUsed
                ? items.find((item) => item.uid === (vendorType.parentUID.replaceAll('0', '').replaceAll('-', '').length === 0
                    ? vendorType.scmsTypeUID : vendorType.parentUID))
                : undefined;
            items.push({
                text: vendorType.displayName,
                name: vendorType.displayName,
                enabled: vendorType.isUsed,
                parent: parentItem?.uid,
                status: '',
                id: vendorType.id,
                uid: vendorType.vendorTypeUID.replaceAll('0', '').replaceAll('-', '').length === 0 ? vendorType.scmsTypeUID : vendorType.vendorTypeUID,
                parentHierarchy: parentItem ? [...parentItem.parentHierarchy, parentItem.uid] : [],
                level: vendorType.levelNumber,
            });
        });
        return items;
    }
});
export const useSCMSList = () => useQuery(['SCMSList'], () => fetchSCMSList(), {
    staleTime: Infinity,
    select: (data) => data.content,
});
