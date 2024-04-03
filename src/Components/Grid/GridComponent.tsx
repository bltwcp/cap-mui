import { useState, useEffect, } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, 
} from '@mui/material'

import Checkbox from '../Checkbox'
import { Button } from '../mui'

interface DialogColumnSHDialogProps {
    columns: string[]
    showhides: boolean[]
    open: boolean
    onClose: () => void
    onComplete: (columnsSH: { [key: number]: boolean }) => void
}

export const DialogColumnSHDialog = (props: DialogColumnSHDialogProps) => {
    const [showhides, setShowHides] = useState<boolean[]>(props.showhides ?? [])
    useEffect(() => {
        setShowHides(props.showhides)
    }, [props.showhides])

    const handleSHChange = (index: number, check: boolean) => {
        const newSHs = showhides.map((sh, i) => i === index ? check : sh)
        setShowHides(newSHs)
    }

    const handleOk = () => {
        props.onClose()
        let shChanged: { [key: number]: boolean } = {}
        showhides.forEach((sh, index) => { // only return changed index
            if (sh !== props.showhides[index])
                shChanged[index] = sh
        })
        props.onComplete(shChanged)
    }

    return (<Dialog
        onClose={props.onClose}
        open={props.open}
        maxWidth='md'
    >
        <DialogTitle>Show/Hide Columns</DialogTitle>
        <DialogContent>
            {props.columns.map((column, index) => {
                if (column === '')
                    return undefined
                return (<div key={`grid_showhide_${index}_${column}`}>
                    <Checkbox
                        label={column}
                        defaultChecked={props.showhides[index]}
                        onChange={(check: boolean) => handleSHChange(index, check)}
                    />
                </div>)
            }).filter((v) => v)}
        </DialogContent>
        <DialogActions>
            <Button
                onClick={handleOk}
                color='primary'
            >
                OK
            </Button>
        </DialogActions>
    </Dialog>)
}