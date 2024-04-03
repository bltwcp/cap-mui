import { useState, useEffect, useMemo, } from 'react'
import {
    Button, Grid, Typography,
    Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { useSCMS, useSCMSList, useSCMSContext, HierarchyItemInterface, } from './useHierarchy'
import { Select, } from '../../Components'
import { HierarchyBox } from '../Common'

interface SCMSDialogProps {
    value: HierarchyItemInterface[]
    display: boolean
    onClose?: () => void
    onComplete?: (items: HierarchyItemInterface[]) => void
}

export const SCMSDialog = (props: SCMSDialogProps) => {
    const [select, setSelect] = useState<HierarchyItemInterface[]>(props.value ?? [])
    const [defaultSelect, setDefaultSelect] = useState<HierarchyItemInterface[]>(props.value ?? [])
    const [highlight, setHighlight] = useState<HierarchyItemInterface>()
    const [currentData, setCurrentData] = useState<any>({ item: [], block: [] })

    const [currentType, setCurrentType] = useState<{ name: string, uid: string }>()

    const { setSavedItems } = useSCMSContext()
    const { data } = useSCMS(currentType?.uid)
    const { data: dataList } = useSCMSList()
    const typeList = useMemo(() => {
        if (dataList) {
            const typeList = dataList.map((scms: any) => ({ name: scms.name, uid: scms.uid }))
            setCurrentType(typeList[0])
            return typeList
        }
        return []
    }, [dataList])

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

    const handleSCMSTypeSelect = (scmsType: string | undefined) => {
        if (scmsType) {
            const type = typeList.find((type: any) => type.name === scmsType)
            setCurrentType(type)
        }
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
                <span>Supply Chain</span>
                <span
                    style={{ position: 'absolute', right: '20px', top: '15px', }}
                >
                    <CloseIcon
                        onClick={handleCloseDialog}
                        sx={{ cursor: 'pointer', }}
                    />
                </span>
            </DialogTitle>
            <DialogContent>
                <Select
                    label='SCMS Type'
                    menuItems={typeList.map((scms: any) => scms.name)}
                    initialSelected='Merchandise'
                    onChange={handleSCMSTypeSelect}
                    sx={{ width: '180px', marginBottom: '10px', }}
                />
                <Grid container spacing={0.5}>
                    {currentData?.block.map((block: any) => {
                        return (<Grid item xs={12 / currentData.block.length ?? 1} key={`scms_${block.title}`}>
                            <Typography variant='body1'>{block.title}</Typography>
                        </Grid>)
                    })}
                    {currentData?.block.map((block: any, index: number) => {
                        return (<Grid item xs={12/(currentData.block.length ?? 1)} key={`scms_item_${index}`}>
                            <HierarchyBox
                                type={block.key}
                                items={currentData.items.filter((item: any) => item.text.substring(0, 3).toUpperCase() === block.title.toUpperCase())}
                                selected={select}
                                disallowClickOff={true}
                                highlight={highlight}
                                onItemSelect={handleItemSelect}
                                onItemHighlight={handleItemHighlight}
                                sx={{ height: '20vh', border: '1px solid #999', }}
                            />
                        </Grid>)
                    })}
                    {currentData?.block.map((block: any, index: number) => {
                        return (<Grid item xs={12/(currentData.block.length ?? 1)} key={`scms_select_${index}`}>
                            <HierarchyBox
                                type={block.key}
                                items={select.filter((item) => item.text.substring(0, 3).toUpperCase() === block.title.toUpperCase())}
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

SCMSDialog.defaultProps = {
    display: false,
    selected: [],
}