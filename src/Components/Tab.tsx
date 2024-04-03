import React, { useState, useEffect, useMemo, forwardRef, Ref } from 'react'
import { SxProps, Theme, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { nanoid } from 'nanoid'

import { StyledMuiTabs, Tab } from './mui'
import { defaultValue, } from './Utils'

export interface TabsProps {
    onTabChange?: (tab: number) => void
    onTabClose?: (tab: number) => void
    tabs: string[]
    sx?: SxProps<Theme>
    tabSx?: SxProps<Theme>
    currentTab?: number
    freezeTabs?: number
    MaxTabLength?: number
}

export const Tabs = forwardRef((props: TabsProps, ref?: Ref<HTMLButtonElement>) => {
    const [tabs, setTabs] = useState<string[]>(props.tabs)
    const [currentTab, setCurrentTab] = useState<number>(defaultValue(props.currentTab, 0))

    const uid = useMemo(() => nanoid(), [])

    useEffect(() => {
        setTabs(props.tabs)
    }, [props.tabs])
    
    useEffect(() => {
        props.onTabChange && props.onTabChange(currentTab)
    }, [currentTab]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.currentTab !== undefined && props.currentTab !== currentTab)
            setCurrentTab(props.currentTab)
    }, [props.currentTab]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
        setCurrentTab(newValue)

    const handleClose = (event: React.MouseEvent, index: number) => {
        event.stopPropagation()
        if (props.onTabClose) // user handle tab close event
            props.onTabClose(index)
        else { // default tab close flow
            const newTabs = tabs.filter((t, i) => i !== index)
            let newCurrentTab = currentTab
            if (currentTab >= newTabs.length)
                newCurrentTab = newTabs.length - 1
            setTabs(newTabs)
            setCurrentTab(newCurrentTab)
        }
    }

    if (currentTab < tabs.length)
        return (<div
            style={{
                overflowY: 'hidden',
                overflowX: 'auto',
            }}
        >
            <StyledMuiTabs
                ref={ref}
                value={currentTab}
                onChange={handleTabChange}
                variant='scrollable'
                scrollButtons='auto'
                sx={props.sx}
            >
                {tabs.map((tab, index) => {
                    const isEllipsis = props.MaxTabLength && tab.length > props.MaxTabLength
                    const tabLabel = isEllipsis ? tab.substring(0, props.MaxTabLength) + '...' : tab
                    const tooltipTitle = isEllipsis ? tab : ''
                    const iconProps = props.freezeTabs && props.freezeTabs <= index
                        ? {
                            icon: (<CloseIcon
                                sx={{ fontSize: '13px', }}
                                onClick={(event: React.MouseEvent) => handleClose(event, index)}
                            />),
                        }
                        : {}
                    return (
                        <Tooltip key={`tab_${uid}_${index}`} title={tooltipTitle}>
                            <Tab
                                {...iconProps}
                                iconPosition='end'
                                label={tabLabel}
                                id={`${index}`}
                                sx={props.tabSx}
                            />
                        </Tooltip>
                    )
                })}
            </StyledMuiTabs>
        </div>)
    return <></>
})
