import { useState, useEffect, useRef, } from 'react'
import {
    Typography, Button, Grid,
    Dialog, DialogActions, DialogContent, DialogTitle, Popover,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'

import { HierarchyItemInterface, } from './useHierarchy'
import { TextInput } from '../../Components'
import { HierarchyBox } from '../Common'

interface HierarchyBaseDialogProps {
    label: string
    value: HierarchyItemInterface[]
    display: boolean
    onClose?: () => void
    onComplete?: (items: HierarchyItemInterface[]) => void

    useHierarchyContext: () => { savedItems: any[], setSavedItems: (items: any[]) => void }
    useHierarchy: (idArray: string) => { data: any }
    useHierarchyItem: (idArray: string | undefined) => { data: any }
    parseIDArray: (savedItems: HierarchyItemInterface[], itemData: any) => string
    findItem: (saveItems: HierarchyItemInterface[], itemData: any) => HierarchyItemInterface | undefined
}

export const HierarchyBaseDialog = (props: HierarchyBaseDialogProps) => {
    const searchInputRef = useRef(null)
    const [defaultSelect, setDefaultSelect] = useState<HierarchyItemInterface[]>(props.value ?? [])
    const [select, setSelect] = useState<HierarchyItemInterface[]>(props.value ?? [])
    const [highlight, setHighlight] = useState<HierarchyItemInterface>()
    const [currentData, setCurrentData] = useState<any>({ item: [], block: [] })

    const [showPopover, setShowPopover] = useState<boolean>(false)
    const [popoverContent, setPopoverContent] = useState<HierarchyItemInterface[]>([])
    const [searchStr, setSearchStr] = useState<string>('')
    const [searchIDArray, setSearchIDArray] = useState<string>('')

    const { savedItems, setSavedItems } = props.useHierarchyContext()
    const { data } = props.useHierarchy(
        highlight ? [...highlight.parentHierarchy, highlight.id].join(',') : '1'
    )
    const { data: tempData } = props.useHierarchy(searchIDArray)
    const { data: itemData } = props.useHierarchyItem(searchStr)

    useEffect(() => {
        if (props.value && props.value.length > 0 && props.value.length === defaultSelect.length) {
            const same = props.value.map((value, index) => value.uid.toUpperCase() === defaultSelect[index].uid.toUpperCase())
                .reduce((accu, curr) => accu && curr, true)
            if (same)
                return
        }
        setSelect(props.value)
        setDefaultSelect(props.value)
    }, [props.value]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (data && data.items && data.items.length > 0) {
            setCurrentData(data)
            setSavedItems(data.items)
        }
    }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (tempData && tempData.items && tempData.items.length > 0) {
            setSavedItems(tempData.items)
        }
    }, [tempData]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let items: any[] = []
        if (!itemData)
            return
        
        if (Array.isArray(itemData)) { // PH
            items = itemData?.map((item: any) => {
                const savedItem = props.findItem(savedItems, item)
                if (savedItem)
                    return savedItem
                setSearchIDArray(props.parseIDArray(savedItems, [item]))
                return undefined
            }).filter((v: any) => v)
        } else { // CH
            const saveItem = props.findItem(savedItems, itemData)
            if (saveItem)
                items.push(saveItem)
            else
                setSearchIDArray(props.parseIDArray(savedItems, itemData))
        }
        if (items.length > 0) {
            const same = popoverContent.length === items.length &&
                popoverContent.map((content, index) => content.uid.toUpperCase() === items[index].uid.toUpperCase())
                    .reduce((accu, curr) => accu && curr, true)
            if (same)
                return
            
            setPopoverContent(items)
            setShowPopover(true)
        }
    }, [itemData, savedItems]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleItemSelect = (item: HierarchyItemInterface, checked: boolean) => {
        if (checked) {
            const newSelect = [...select, item].filter((s, index, ss) => index === ss.indexOf(s))
            setSelect(newSelect)
        } else {
            const newSelect = select.filter((s) => s !== item)
            setSelect(newSelect)
        }
    }

    const handleItemRemove = (item: HierarchyItemInterface, checked: boolean) => {
        const newSelect = select.filter((s) => s !== item)
        setSelect(newSelect)
    }

    const handleItemHighlight = (item: HierarchyItemInterface) => {
        setHighlight(item)
    }

    const handleCloseDialog = () => {
        props.onClose && props.onClose()
    }
    
    const handleSelectComplete = () => {
        props.onComplete && props.onComplete(select)
        handleCloseDialog()
    }

    const handleSearchTextChange = (value: string) => {
        setSearchStr(value)
    }

    const handlePopoverClose = () => {
        setShowPopover(false)
    }

    const handlePopoverSelect = (item: HierarchyItemInterface) => {
        const newSelect = [item, ...select].filter((s, index, ss) => index === ss.indexOf(s))
        setSelect(newSelect)
        setShowPopover(false)
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth='lg'
            open={props.display}
            onClose={handleCloseDialog}
            sx={{ overflowY: 'hidden', }}
        >
            <DialogTitle sx={{ fontSize: '16px', }}>
                <span>{props.label}</span>
                <span
                    style={{ position: 'absolute', right: '20px', top: '15px', }}
                >
                    <TextInput
                        ref={searchInputRef}
                        onChange={handleSearchTextChange}
                        sx={{ width: '150px', }}
                    />
                    {searchInputRef.current && <Popover
                        open={showPopover}
                        anchorEl={searchInputRef.current}
                        onClose={handlePopoverClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        disableAutoFocus={true}
                        disableEnforceFocus={true}
                    >
                        {popoverContent?.map((content, index) => {
                            return (
                                <Button
                                    key={`hierarchy_popover_${index}_${content.text}`}
                                    onClick={() => handlePopoverSelect(content)}
                                >
                                    {content.text}
                                </Button>
                            )
                        })}
                    </Popover>}
                    <SearchIcon
                        sx={{ marginRight: '50px', }}
                    />
                    <CloseIcon
                        onClick={handleCloseDialog}
                        sx={{ cursor: 'pointer', }}
                    />
                </span>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={0.5}>
                    {currentData?.block.map((block: any) => {
                        return (<Grid item xs={12 / currentData.block.length ?? 1} key={`hierarchy_${block.title}`}>
                            <Typography sx={{fontSize: '13px'}}>{block.title}</Typography>
                        </Grid>)
                    })}
                    {currentData?.block.map((block: any, index: number) => {
                        return (<Grid item xs={12/(currentData.block.length ?? 1)} key={`hierarchy_item_${index}`}>
                            <HierarchyBox
                                type={block.key}
                                items={currentData.items.filter((item: any) => item.parentHierarchy.length === index)}
                                selected={select}
                                disallowClickOff={true}
                                highlight={highlight}
                                onItemSelect={handleItemSelect}
                                onItemHighlight={handleItemHighlight}
                                sx={{ height: '30vh', border: '1px solid #999', }}
                            />
                        </Grid>)
                    })}
                    {currentData?.block.map((block: any, index: number) => {
                        return (<Grid item xs={12/(currentData.block.length ?? 1)} key={`hierarchy_select_${index}`}>
                            <HierarchyBox
                                type={block.key}
                                items={select.filter((item) => item.parentHierarchy.length === index)}
                                selected={select}
                                disallowClickOff={false}
                                onItemSelect={handleItemRemove}
                                onItemHighlight={handleItemHighlight}
                                sx={{ height: '20vh', border: '1px solid #999', }}
                            />
                        </Grid>)
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSelectComplete} sx={{width: '100%'}}>Send</Button>
            </DialogActions>
        </Dialog>
    )
}
