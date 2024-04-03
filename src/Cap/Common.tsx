import {
    Checkbox, Box, Stack, Tooltip,
    SxProps, Theme,
} from '@mui/material'
import { Tip, Abbr, } from '../Components/Utils'
import { HierarchyItemInterface, } from './HierarchyComponents/useHierarchy'

export interface CapMultiSelectProps {
    label?: string
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
}

export interface CapSelectProps {
    label?: string
    value?: string
    initialSelected?: string
    placeholder?: string
    placeholderColor?: string
    selectedAtDisabled?: string
    onChange?: (value: string | undefined) => void
    tooltip?: boolean
    disabled?: boolean
    sx?: SxProps<Theme>
}

interface HierarchyItemProps {
    item: HierarchyItemInterface
    checked: boolean
    disabled: boolean
    backgroundColor: string | undefined
    onItemSelect?: (item: HierarchyItemInterface, checked: boolean) => void
    onItemClick?: (item: HierarchyItemInterface) => void
}

export const HierarchyItem = (props: HierarchyItemProps) => {
    const handleItemHighlight = () => {
        props.onItemClick && props.onItemClick(props.item)
    }

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onItemSelect && props.onItemSelect(props.item, event.target.checked)
    }

    return (<span
        style={{
            backgroundColor: props.backgroundColor,
            height: '31px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '100%',
        }}
        onClick={handleItemHighlight}
    >
        <Checkbox
            checked={props.checked}
            disabled={props.disabled && props.checked}
            onChange={handleChecked}
            sx={{
                marginLeft: '2px',
                paddingX: '4px',
                '& .MuiSvgIcon-root': { fontSize: '16px', },
            }}
            onClick={(e) => e.stopPropagation()}
        />
        <Tooltip
            title={props.item.text} 
            enterDelay={300}
        >
            <span
                style={{
                    fontSize: '13px',
                    fontWeight: props.backgroundColor ? 'bold' : undefined,
                    color: '#039',
                }}
            >
                {props.item.text}
            </span>
        </Tooltip>
    </span>)
}

interface HierarchyBoxProps {
    type: string
    items: HierarchyItemInterface[]
    highlight?: HierarchyItemInterface
    selected: HierarchyItemInterface[]
    disallowClickOff: boolean
    sx?: SxProps<Theme>
    onItemSelect?: (item: HierarchyItemInterface, checked: boolean) => void
    onItemHighlight?: (item: HierarchyItemInterface) => void
}

export const HierarchyBox = (props: HierarchyBoxProps) => {
    const handleItemHighlight = (item: HierarchyItemInterface) => {
        props.onItemHighlight && props.onItemHighlight(item)
    }

    const bgColor = (item: HierarchyItemInterface, index: number): string | undefined => {
        if (props.type === 'Item')
            switch (item.status) {
                case 'PENDING':
                    return '#ffff8c'
                case 'NEW':
                    return '#c4f5dd'
                case "PHASE OUT":
                    return '#c9c9c9'
            }
        else {
            let highlight = false
            if (props.highlight?.id === item.id || props.highlight?.parentHierarchy?.includes(item.id))
                highlight = true
            else if (index === 0)
                highlight = !props.items.some((item) => item.id === props.highlight?.id || props.highlight?.parentHierarchy?.includes(item.id))
            
            if (highlight)
                return '#9cf'
        }
    }

    return (<Box sx={{ overflowY: 'auto', ...props.sx }}>
        <Stack>
            {props.items.map((item, index) => (
                <HierarchyItem
                    item={item}
                    key={`phitem_${item.id}`}
                    checked={props.selected.some((selected) => selected.uid === item.uid)}
                    disabled={props.disallowClickOff}
                    backgroundColor={bgColor(item, index)}
                    onItemSelect={props.onItemSelect}
                    onItemClick={handleItemHighlight}
                />
            ))}
        </Stack>
    </Box>)
}
