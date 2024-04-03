import { useState, useEffect, useMemo, forwardRef, Ref, } from 'react'
import {
    ListItemText,
    Tooltip,
    SelectChangeEvent,
    SxProps, Theme,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CloseIcon from '@mui/icons-material/Close'
import { nanoid } from 'nanoid'

import {
    StyledMuiCheckbox, MenuItem, StyledMultiMuiSelect, InputLabel, FormControl,
    IconButton,
} from './mui'
import { Tip, Abbr, tipMsg, leadingLabel, triOp, or, } from './Utils'

export interface HierarchySelectItem {
    name: string
    //selectabled?: boolean
    parent?: string
    expand?: boolean
}

interface MultiSelectProps {
    label?: string
    menuItems?: string[] | HierarchySelectItem[]
    value?: string[]
    initialSelected?: string[]
    placeholder?: string
    placeholderColor?: string
    selectedAtDisabled?: string[]
    onChange?: (value: string[]) => void
    tooltip?: Tip
    abbr?: Abbr
    disabled?: boolean
    sx?: SxProps<Theme>
    menuItemSx?: SxProps<Theme>
}

export const MultiSelect = forwardRef((props: MultiSelectProps, ref?: Ref<HTMLElement>) => {
    const [values, setValues] = useState<string[]>(props.initialSelected ?? [])
    const [displayValues, setDisplayValues] = useState<string[]>([])
    const [showTip, setShowTip] = useState<boolean>(false)
    const [inSelect, setInSelect] = useState<boolean>(false)
    const [selectableItems, setSelectableItems] = useState<string[]>([])
    const [expandItems, setExpandItems] = useState<string[]>([])
    const uid = useMemo(() => nanoid(), [])
    const itemHierarchies = useMemo(() => {
        if (!props.menuItems || props.menuItems.length === 0 || typeof props.menuItems[0] === 'string')
            return undefined

        let hierarchies: { [key: string]: string[] } = {}
        let expandItems: string[] = []
        props.menuItems.forEach((item) => {
            if (typeof item === 'string')
                return
            if (item.parent) {
                const parentHierarchies = [...(hierarchies[item.parent] ?? []), item.parent]
                hierarchies[item.name] = parentHierarchies
            }
            if (item.expand)
                expandItems.push(item.name)
        })
        setExpandItems(expandItems)
        return hierarchies
    }, [props.menuItems])

    useEffect(() => {
        if (!props.menuItems || props.menuItems.length === 0)
            return

        const selectableItems = typeof props.menuItems[0] === 'string'
            ? props.menuItems as string[]
            : (props.menuItems as HierarchySelectItem[])
                .filter((item) =>
                    or(typeof item === 'string', !item.parent, expandItems.includes(item.parent!))
                )
                .map((item) => triOp(typeof item === 'string', item, item.name))
        setSelectableItems(selectableItems)
    }, [props.menuItems, expandItems])
    
    useEffect(() => {
        const displays = (props.disabled ? props.selectedAtDisabled : values) ?? []
        if (JSON.stringify(displayValues) !== JSON.stringify(displays))
            setDisplayValues(displays)
    }, [props.disabled, values]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        props.onChange && props.onChange(displayValues)
    }, [displayValues]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.value && JSON.stringify(props.value) !== JSON.stringify(values)) {
            setValues(props.value)
            //!props.disabled && props.onChange && props.onChange(props.value)
        }
    }, [props.value]) // eslint-disable-line react-hooks/exhaustive-deps

    const expandIcon = (itemName: string) => {
        if (!itemHierarchies || !itemName || itemName.length === 0)
            return
        const hierarchy = itemHierarchies[itemName]
        const sx = { fontSize: '16px', marginLeft: `${hierarchy?.length*15}px`, paddingRight: '4px', }
        const hasChild = Object.values(itemHierarchies).some((v) => v.some((vv) => vv === itemName))
        const expanded = expandItems.includes(itemName)
        if (hasChild) {
            if (expanded)
                return <RemoveIcon onClick={(e) => {
                    e.stopPropagation()
                    handleExpand(itemName, false)
                }} sx={sx} />
            else
                return <AddIcon onClick={(e) => {
                    e.stopPropagation()
                    handleExpand(itemName, true)
                }} sx={sx} />
        } else
            return <span style={{ width: `${16+(hierarchy?.length ?? 0)*15}px`, paddingRight: '4px', }} />
    }

    const handleExpand = (itemName: string, expand: boolean) => {
        if (expand)
            setExpandItems(expandItems.concat(itemName))
        else
            setExpandItems(expandItems.filter((item) => !isBranchOf(itemName, item) && itemName !== item))
    }

    const isHierarchyItems = () => {
        return props.menuItems && typeof props.menuItems[0] !== 'string'
    }

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        let newValues = event.target.value as string[]
        if (event.target.value.length > values.length && isHierarchyItems()) { // add one && is hierarchy
            const operatingValue = event.target.value[event.target.value.length - 1]
            const menuItems = props.menuItems as HierarchySelectItem[]
            const operatingItem = menuItems.find((item) => item.name === operatingValue)
                
            // in the following, it handle hierarchy checked relation
            // - if all childs are checked, the "checked parent" can represent all checked childs
            // - if any of child in a checked branch is unchecked, the branch should unchecked and all other sibiling childs should checked
            newValues = newValues.filter((value) => !isBranchOf(operatingValue, value))
            let item = menuItems.find((item) => item.name === operatingValue)
            while (item?.parent) {
                const itemParent = item?.parent
                if (values.includes(itemParent)) { // branch is checked: remove branch value and add all its leaves without operatingValue
                    const negalects = newValues
                    const allLeaves = menuItems.filter((menuItem) =>
                        (menuItem.parent === itemParent || operatingItem?.parent === menuItem.parent) &&
                        !isBranchOf(menuItem.name, operatingValue)
                    )
                        .map((menuItem) => menuItem.name)
                        .filter((leafItem) => !negalects.includes(leafItem))
                    newValues = values.concat(allLeaves)
                        .filter((value) => value !== itemParent)
                    break
                } else { // branch is unchecked: add operatingItem
                    // need to check if all sibilings are checked => uncheck all sibilings and check the branch
                    const currentCheckeds = newValues
                    const allSibiling = menuItems.filter((menuItem) => menuItem.parent === itemParent)
                    const allSibilingChecked = allSibiling.map((leave) => currentCheckeds.includes(leave.name)).reduce((accu, curr) => accu && curr, true)
                    if (allSibilingChecked) {
                        newValues.push(item.parent)
                        newValues = newValues.filter((value) => !allSibiling.some((sibiling) => sibiling.name === value))
                    }
                    item = menuItems.find((_item) => _item.name === itemParent)
                }
            }
        }
        newValues = newValues.sort((a, b) => {
            const aIndex = selectableItems.indexOf(a)
            const bIndex = selectableItems.indexOf(b)
            return aIndex - bIndex
        })
        setValues(newValues)
    }

    const inputMsg = () => {
        let displayMsg = props.placeholder ?? ''
        if (displayValues.length > 0) {
            if (props.abbr && props.abbr === '...')
                displayMsg = displayValues.join(',')
            else
                displayMsg = `${displayValues.length} selected`
        }
        return (<span>
            {displayMsg}
        </span>)
    }

    const isBranchOf = (branch: string, leaf: string) => {
        if (branch === leaf)
            return false
        if (props.menuItems && props.menuItems.length > 0 && typeof props.menuItems[0] !== 'string') {
            let leafParentName = (props.menuItems as HierarchySelectItem[]).find((item) => item.name === leaf)?.parent
            while (leafParentName) {
                if (leafParentName === branch)
                    return true
                const refName = leafParentName
                leafParentName = (props.menuItems as HierarchySelectItem[]).find((item) => item.name === refName)?.parent
            }
        }
        return false
    }

    const isChecked = (item: string) => {
        return values.some((value) => value === item || isBranchOf(value, item))
    }

    const isIndeterminated = (item: string) => {
        return props.menuItems && typeof props.menuItems[0] !== 'string' &&
            !values.includes(item) &&
            values.some((value) => isBranchOf(item, value))
    }

    /*const isSelectabled = (item: string) => {
        return isHierarchyItems()
            ? ((props.menuItems as HierarchySelectItem[]).find((menuItem) => menuItem.name === item)?.selectabled ?? true)
            : ((props.menuItems as string[]).find((menuItem) => menuItem === item) ?? true)
    }*/

    return (<span ref={ref}>
        {leadingLabel(props.label ?? '')}
        <FormControl>
            <InputLabel
                key={`${props.label}-label`}
                sx={{
                    color: props.disabled ? 'rgba(0, 0, 0, 0.38)' :
                        props.placeholderColor ?? 'black',
                }}
            >
                {props.placeholder}
            </InputLabel>
            <Tooltip
                key={`${props.label}-tooltip`}
                enterDelay={300}
                leaveDelay={200}
                title={tipMsg(displayValues, props.tooltip ?? 'verticle', props.placeholder ?? '', `mselect_${uid}`)}
                open={showTip}
                arrow
            >
                <StyledMultiMuiSelect
                    key={`${props.label}-select`}
                    multiple
                    value={displayValues}
                    onChange={handleChange}
                    disabled={props.disabled}
                    endAdornment={
                        <IconButton role='close' onClick={() => setValues([])} disabled={props.disabled}>
                            <CloseIcon />
                        </IconButton>
                    }
                    sx={props.sx}
                    renderValue={inputMsg}
                    onMouseEnter={() => props.tooltip && props.tooltip !== 'none' && !inSelect && setShowTip(true)}
                    onMouseLeave={() => props.tooltip && props.tooltip !== 'none' && setShowTip(false)}
                    onMouseDown={() => props.tooltip && props.tooltip !== 'none' && setShowTip(false)}
                    onOpen={() => setInSelect(true)}
                    onClose={() => {
                        setInSelect(false)
                        props.onChange && props.onChange(displayValues)
                    }}
                >
                    {selectableItems.map((item: string) => (
                        <MenuItem
                            key={`${props.label}-item-${item}`}
                            value={item}
                            sx={props.menuItemSx}
                        >
                            <StyledMuiCheckbox
                                checked={isChecked(item)}
                                indeterminate={isIndeterminated(item)}
                                //disabled={!isSelectabled(item)}
                            />
                            {expandIcon(item)}
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </StyledMultiMuiSelect>
            </Tooltip>
        </FormControl>
    </span>)
})

export default MultiSelect