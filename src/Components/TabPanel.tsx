import React, { useMemo, forwardRef, Ref, } from 'react'
import { nanoid } from 'nanoid'
import { defaultValue } from './Utils'

export type HideType = 'none' | 'hide' | 'nodisplay'

interface TabPanelProps {
    children?: React.ReactNode
    displayStyle: any
}

const displaySX = {
    height: '100%',
}
const hiddenSX = {
    overflow: 'hidden',
    height: '0px',
}
const noDisplaySX = {
    display: 'none',
}
export const hideSX = (display: boolean, hideMethod: HideType) => {
    if (display)
        return displaySX
    switch (hideMethod) {
        case 'hide':
            return hiddenSX
        case 'nodisplay':
        default:
            return noDisplaySX
    }
}

const TabPanel = (props: TabPanelProps) => {
    return (<div
        style={props.displayStyle}
    >
        {props.children}
    </div>)
}

export interface TabPanelsProps {
    anchorEl?: HTMLElement
    children?: React.ReactNode
    currentTab: number
    hideMethod?: HideType
}

export const TabPanels = forwardRef((props: TabPanelsProps, ref?: Ref<HTMLDivElement>) => {
    const uid = useMemo(() => nanoid(), [])

    const hideMethod = defaultValue(props.hideMethod, 'hide')
    
    const renderTabContent = () => {
        if (hideMethod === 'none')
            return React.Children.toArray(props.children)[props.currentTab]
        return React.Children.toArray(props.children).map((panel, index) => (
            <TabPanel
                key={`panel_${uid}_${index}`}
                displayStyle={hideSX(props.currentTab === index, hideMethod)}
            >
                {panel}
            </TabPanel>
        ))
    }

    return (
        <div
            ref={ref}
            style={props.anchorEl
                ? { width: '100%', position: 'absolute', top: props.anchorEl.getBoundingClientRect().bottom, bottom: 0, }
                : { width: '100%', }}
        >
            {props.children && renderTabContent()}
        </div>
    )
})

export default TabPanels