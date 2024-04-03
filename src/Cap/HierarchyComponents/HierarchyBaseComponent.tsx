import { useEffect, useState, useCallback, } from 'react'
import { Button, SxProps, Theme, } from '@mui/material'

import { HierarchyItemInterface, hierarchyContext, allHierarchyItems, } from './useHierarchy'
import { TextInput, Tip, tipMsg } from '../../Components'

export interface HierarchyBaseComponentProps {
    defaultSelected?: string
    selected?: string
    onChange?: (items: HierarchyItemInterface[]) => void
    disabled?: boolean
    sx?: SxProps<Theme>
    buttonSX?: SxProps<Theme>
    dialogSX?: SxProps<Theme>
    tooltip?: Tip
}

type HierarchyComponentProps = HierarchyBaseComponentProps & {
    label: string
    Dialog: (selected: HierarchyItemInterface[], showDialog: boolean, handleCloseSelectDialog: () => void, handleDialogInput: (items: HierarchyItemInterface[]) => void) => JSX.Element
    useHierarchy: (idArray: string) => { data: any }
    useHierarchyItem: (idArray: string | undefined) => { data: any }
    parseIDArray: (savedItems: HierarchyItemInterface[], itemData: any) => string
}

export const HierarchyComponent = (props: HierarchyComponentProps) => {
    const [savedItems, setSavedItems] = useState<HierarchyItemInterface[]>([])
    const [savedNonItems, setSavedNonItems] = useState<string[]>([])
    const [parseItemName, setParseItemName] = useState<string | undefined>('')
    const [parseIDArray, setParseIDArray] = useState<string>('')

    const [selected, setSelected] = useState<HierarchyItemInterface[]>([])
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [inputStr, setInputStr] = useState<string>(props.defaultSelected ?? '')
    const { data: hData } = props.useHierarchy(parseIDArray)
    const { data: itemData } = props.useHierarchyItem(parseItemName)

    useEffect(() => {
        if (!inputStr || inputStr.length === 0 || savedItems.length === 0) {
            setSelected([])
            return
        }

        const splits = inputStr.split(',').map((str) => str.trim())
        const notFoundItems = splits.map((str) =>
            savedNonItems.includes(str) || savedItems?.find((item) => item.text.toUpperCase() === str.toUpperCase() || item.name?.toUpperCase() === str.toUpperCase())
                ? undefined
                : str)
                    .filter((item, index, items) => item && index === items.indexOf(item))
        if (notFoundItems.length > 0) {
            setParseItemName(notFoundItems[0])
            return
        }
        const parsedItems = splits.map((str) => savedItems.find((item) => item.text.toUpperCase() === str.toUpperCase() || item.name?.toUpperCase() === str.toUpperCase()))
            .filter((item, index, items) => item && index === items.indexOf(item))

        setSelected(parsedItems as HierarchyItemInterface[])
    }, [inputStr, savedItems]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        //console.log(parseItemName, itemData)
        if (!itemData || !parseItemName)
            return
        if (itemData.length === 0 && parseItemName !== '') {
            setSavedNonItems(savedNonItems.concat(parseItemName))
            return
        }
        //console.log(savedItems, itemData, props.parseHIDArray(saveditems, itemData))
        setParseIDArray(props.parseIDArray(savedItems, itemData))
        const matchSavedItem = savedItems.find((item) => item.uid.toUpperCase() === itemData[0].uid.toUpperCase())
        if (matchSavedItem && matchSavedItem.name === undefined) {
            const newSaved = savedItems.map((item) => item.uid.toUpperCase() === itemData[0].uid.toUpperCase()
                ? ({
                    ...item,
                    name: itemData[0].name,
                })
                : item
            )
            setSavedItems(newSaved)
        }
    }, [itemData, savedItems]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        //console.log(hData)
        if (hData && hData.items && hData.items.length > 0) {
            //addSavedHItems(hData[props.baseItem])
            addSavedHItems(hData.items)
        }
    }, [hData]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        props.onChange && props.onChange(selected)
    }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleInputChange = (input: string) => {
        setInputStr(input)
    }
    const handleDialogInput = (items: HierarchyItemInterface[]) => {
        setSelected(items)
        setInputStr(items.map((item) => item.text).join(','))
    }

    const handleShowSelectDialog = useCallback(() => setShowDialog(true), [])
    const handleCloseSelectDialog = useCallback(() => setShowDialog(false), [])

    const addSavedHItems = (items: HierarchyItemInterface[]) => {
        setSavedItems(allHierarchyItems(savedItems, items))
    }

    return (<hierarchyContext.Provider value={{ savedItems: savedItems, setSavedItems: addSavedHItems }}>
        <TextInput
            label={props.label}
            placeholder='none selected'
            value={inputStr}
            onChange={handleInputChange}
            tooltipFn={() => tipMsg(selected.map((s) => s.text), props.tooltip ?? 'horizontal', '', 'hierarchy')}
            sx={{
                width: '200px',
                ...props.sx
            }}
            disabled={props.disabled}
            clearable={true}
        />
        <Button
            startIcon={<img
                src={`${process.env.PUBLIC_URL}/target.png`}
                width={'16px'}
                height={'16px'}
                alt={props.label}
            />}
            onClick={handleShowSelectDialog}
            disabled={props.disabled}
            sx={{
                padding: '0px',
                marginX: '2px',
                minWidth: '26px',
                width: '26px',
                height: '26px',
                '& .MuiButton-startIcon': { marginX: '0px', },
                ...props.buttonSX,
            }}
        />
        {props.Dialog(selected, showDialog, handleCloseSelectDialog, handleDialogInput)}
    </hierarchyContext.Provider>)
}
