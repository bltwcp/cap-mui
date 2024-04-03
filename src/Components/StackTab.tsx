import React, { useState, forwardRef, Ref, useEffect, } from 'react'
import { Stack as MuiStack, Paper, Box, SxProps, Theme, } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { HideType, hideSX, } from './TabPanel'
import { StackTabBar, Typography, } from './mui'
import { defaultValue, triOp } from './Utils'
import { set } from 'date-fns'

const DefaultHideMethod: HideType = 'none'

export interface StackTabsProps {
    initialTab?: number
    currentTab?: number
    tabs: string[]
    children?: React.ReactNode
    anchorEl?: HTMLElement
    hideMethod?: HideType
    onTabChange?: (tab: number) => void
    tabSx?: SxProps<Theme>
    sx?: SxProps<Theme>
}

export const StackTabs = forwardRef((props: StackTabsProps, ref?: Ref<HTMLDivElement>) => {
    const [currentTab, setCurrentTab] = useState<number>(defaultValue(props.currentTab, props.initialTab, 0))

    const switchCurrentTab = (tabIndex: number) => {
        setCurrentTab(triOp(tabIndex === currentTab, -1, tabIndex))
    }

    useEffect(() => {
        props.onTabChange && props.onTabChange(currentTab)
    }, [currentTab]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.currentTab && props.currentTab !== currentTab)
            setCurrentTab(props.currentTab)
    }, [props.currentTab]) // eslint-disable-line react-hooks/exhaustive-deps

    const baseSX = (): React.CSSProperties => {
        if (props.anchorEl)
            return { width: '100%', position: 'absolute', top: props.anchorEl.getBoundingClientRect().bottom, bottom: 0, }
        return { width: '100%', }
    }

    const expandIcon = (index: number) => {
        if (currentTab === index)
            return <RemoveIcon />
        return <AddIcon />
    }

    const hideMethod = defaultValue(props.hideMethod, DefaultHideMethod)
    const noneMode = (index: number) => {
        if (index === currentTab)
            return React.Children.toArray(props.children)[index]
        return <></>
    }

    const displayChild = (index: number) => {
        if (!props.children)
            return <span data-testid='stackTab' />
        
        if (hideMethod === 'none')
            return noneMode(index)
        return (<Box sx={hideSX(currentTab === index, hideMethod)} data-testid='stackTab'>
            {React.Children.toArray(props.children)[index]}
        </Box>)
    }
    
    return (<div
        ref={ref}
        style={baseSX()}
    >
        <MuiStack spacing={0}>
            {props.tabs.map((tab, index) => (
                <Paper
                    key={`stacktab_${index}_${tab}`}
                >
                    <StackTabBar
                        onClick={() => switchCurrentTab(index)}
                        sx={props.sx}
                    >
                        {expandIcon(index)}
                        <Typography variant='body1' sx={props.tabSx}>
                            {tab}
                        </Typography>
                    </StackTabBar>
                    {displayChild(index)}
                </Paper>
            ))}
        </MuiStack>
    </div>)
})
