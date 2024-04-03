import {
    Typography as MuiTypography,
    MenuItem as MuiMenuItem,
    Button as MuiButton,
    Tabs as MuiTabs,
    Tab as MuiTab,
    Input as MuiInput,
    FormControl as MuiFormControl,
    FormControlLabel as MuiFormControlLabel,
    Box as MuiBox,
    Autocomplete as MuiAutocomplete,
    TextField as MuiTextField,
    Checkbox as MuiCheckbox,
    LinearProgress as MuiLinearProgress,
    Select as MuiSelect,
    InputLabel as MuiInputLabel,
    styled, lighten, darken,
} from '@mui/material'

const fontSize = '13px'
const headerFontSize = '16px'
const iconFontSize = '16px'
const titleFontSize = '24px'
const spacingX = 4
const spacing2X = 2 * spacingX
const spacingY = 2
const spacing2Y = 2 * spacingY
const primaryColor = '#5078B3'
const secondaryColor = '#D7E3F3'
const highlightColor = '#2CCBFC'
const borderWidth = 1
const borderBoldWidth = 3
const borderColor = '#AFAFAF'
const inputBorderColor = 'rgba(0, 0, 0, 0.4)'
const rowHeight1 = 28
const rowHeight2 = 18
const listItemHeight = 24

export const Typography = styled(MuiTypography)`
    min-height: ${rowHeight2}px;
    max-height: ${rowHeight2}px;
    padding-left: ${spacing2X}px;
    padding-right: ${spacingX}px;
    &.MuiTypography-h1 {
        font-size: ${titleFontSize};
        min-height: ${rowHeight1}px;
        max-height: ${rowHeight1}px;
    }
`

export const FullWidthBox = styled(MuiBox)`
    width: 100%;
    overflow: hidden;
`

export const FullScreenBox = styled(MuiBox)`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const StackTabBar = styled(MuiBox)`
    background-color: ${secondaryColor};
    min-height: ${listItemHeight}px;
    max-height: ${listItemHeight}px;
    border-bottom: ${borderWidth}px solid ${darken(secondaryColor, 0.3)};
    & svg.MuiSvgIcon-root {
        font-size: ${fontSize};
        padding-left: ${spacing2X}px;
        padding-right: ${spacingX}px;
        display: inline-block;
        height: ${rowHeight2}px;
        vertical-align: middle;
    }
`

export const BarsBox = styled(MuiBox)`
    overflow-x: overlay;
    overflow-y: hidden;
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
`

export const BarsProgress = styled(MuiLinearProgress)`
    position: absolute;
    width: 100%;
`

export const BarContainerBox = styled(MuiBox)`
    display: table-row;
    white-space: nowrap;
`

export const BarBox = styled(MuiBox)`
    padding-left: ${spacing2X}px;
    padding-right: ${spacingX}px;
    padding-top: ${spacingY}px;
    padding-bottom: ${spacing2Y}px;
`

export const DatePickerBox = styled(MuiBox)`
    display: flex;
    padding-left: ${spacingX}px;
    align-items: center;
    width: 93px;
    & input { /* display value */
        background-color: transparent;
        border: 0px;
        border-bottom: ${borderWidth}px solid ${inputBorderColor};
        width: 90px;
        height: 12.7px;
        transform: translateY(1px);
    }
    & .MuiButtonBase-root.MuiIconButton-root { /* calendar icon button */
        transform: translate(-35px);
    }
    & .MuiSvgIcon-root { /* calendar icon */
        font-size: ${iconFontSize};
    }
`

export const MenuItem = styled(MuiMenuItem)`
    padding: 0px ${spacingX}px 0px ${spacing2X}px;
    min-height: ${listItemHeight}px;
    max-height: ${listItemHeight}px;
    & .MuiListItemText-primary {
        padding-left: ${spacing2X}px;
        font-size: ${fontSize};
    }
`

export const Button = styled(MuiButton)`
    color: #FF0;
    background-color: ${primaryColor};
    font-size: ${fontSize};
    width: 80px;
    height: 26px;
    border-radius: 0px;
    transition: none;
    padding-left: ${spacing2X}px;
    padding-right: ${spacingX}px;
    &:hover {
        font-weight: bold;
        background-color: ${primaryColor};
    }
`

export const IconButton = styled(MuiButton)`
    color: grey;
    padding: 0px;
    padding-left: ${spacing2X}px;
    padding-right: ${spacingX}px;
    min-width: 26px;
    width: 26px;
    height: 26px;
    & .MuiButton-startIcon {
        margin: 0px;
    }
    & svg {
        font-size: ${fontSize};
    }
`

export const StyledMuiTabs = styled(MuiTabs)`
    min-height: ${rowHeight1}px;
    max-height: ${rowHeight1}px;
    overflow: overlay;
    z-index: 0;
    & button.MuiTab-textColorPrimary { /* tab button */
        max-height: ${rowHeight1 - spacingY - borderWidth}px;
        min-height: ${rowHeight1 - spacingY - borderWidth}px;
        border-bottom: 0px;
        padding: 0px;
    }
    & button.Mui-selected { /* selected tab button */
        color: #000;
        font-weight: bold;
        border-top: ${borderBoldWidth}px solid ${highlightColor};
        background-color: ${lighten(highlightColor, 0.6)};
    }
    & .MuiTabs-indicator { /* tab button bottom line */
        background-color: ${secondaryColor};
        transition: 0s;
        height: ${borderWidth}px;
    }
    & div.MuiTabs-flexContainer { /* tab bar */
        border-bottom: ${borderWidth}px solid ${inputBorderColor};
    }
`

export const Tab = styled(MuiTab)`
    text-transform: none;
    margin-top: ${spacingY}px;
    margin-left: ${spacingX}px;
    font-size: ${fontSize};
    background-color: ${lighten(borderColor, 0.4)};
    border: ${borderWidth}px solid ${borderColor};
`

export const Input = styled(MuiInput)`
    min-height: ${rowHeight2}px;
    max-height: ${rowHeight2}px;
    padding: ${spacingY}px ${spacingX}px 0px ${spacing2X}px;
    border-radius: 0px;
    &::before {
        border-bottom: ${borderWidth}px solid ${inputBorderColor};
    }
`

export const StyledMuiAutocomplete = styled(MuiAutocomplete)`
    display: inline-block;
    width: 150px;
`

// used in Autocomplete
export const TextField = styled(MuiTextField)`
    font-size: ${fontSize};
    text-align: left;
    border: 0px;
    overflow: hidden;
    & .MuiOutlinedInput-root.MuiInputBase-sizeSmall.MuiAutocomplete-inputRoot {
        height: 22px;
        padding: 0px 32px 0px ${spacingX}px;
    }
    & fieldset.MuiOutlinedInput-notchedOutline { /* input border */
        border: 0px;
        border-bottom: ${borderWidth}px solid ${inputBorderColor};
        border-radius: 0px;
        top: 0px;
    }
    & div.MuiOutlinedInput-root .MuiAutocomplete-endAdornment { /* tool button (clear, arrow) icon box */
        right: 0px;
        & button {
            padding: 2px 0px;
        }
        & svg.MuiSvgIcon-root[data-testid="CloseIcon"] {
            font-size: ${fontSize};
        }
    }
    & div.MuiButtonBase-root.MuiChip-root { /* chip */
        margin-top: 0px;
        margin-bottom: 0px;
    }
`

export const StyledMuiCheckbox = styled(MuiCheckbox)`
    padding: 0px;
    & svg.MuiSvgIcon-root { /* checkbox */
        font-size: ${fontSize};
    }
`

export const StyledMuiSelect = styled(MuiSelect<string>)`
    font-size: ${fontSize};
    textAlign: left;
    border: 0px;
    width: 100px;
    min-height: ${rowHeight2}px;
    max-height: ${rowHeight2}px;
    padding-right: 0px;
    & fieldset.MuiOutlinedInput-notchedOutline { /* border */
        border: 0px;
        border-bottom: ${borderWidth}px solid ${inputBorderColor};
        border-radius: 0px;
    }
    & svg.MuiSvgIcon-root { /* down and up arrow */
        right: -6px;
    }
    & div.MuiInputBase-input[role=button] { /* selected value display, box */
        min-height: ${rowHeight2}px;
        max-height: ${rowHeight2}px;
        padding: 0px ${spacingX}px;
        padding-right: 16px;
        transform: translateY(1px);
    }
    & div.MuiListItemText-root { /* select extra div layer than multiselect */
        margin: 0px;
    }
    & input.MuiSelect-nativeInput { /* selected value display, value */
        font-size: ${fontSize};
    }
    & button.MuiButton-root[role="close"] { /* clear X button */
        position: absolute;
        right: 10px;
        visibility: hidden;
    }
    &:hover {
        & .MuiButton-root[role="close"] {
            visibility: visible;
        }
    }
`

export const StyledMultiMuiSelect = styled(MuiSelect<string[]>)`
    font-size: ${fontSize};
    textAlign: left;
    border: 0px;
    width: 100px;
    min-height: ${rowHeight2}px;
    max-height: ${rowHeight2}px;
    padding-right: 0px;
    & fieldset.MuiOutlinedInput-notchedOutline { /* border */
        border: 0px;
        border-bottom: ${borderWidth}px solid ${inputBorderColor};
        border-radius: 0px;
    }
    & svg.MuiSvgIcon-root { /* down and up arrow */
        right: -6px;
    }
    & div.MuiInputBase-input[role="button"] { /* selected value display, box */
        min-height: ${rowHeight2}px;
        max-height: ${rowHeight2}px;
        padding: 0px ${spacingX}px;
        padding-right: 32px;
        transform: translateY(1px);
    }
    & input.MuiSelect-nativeInput { /* selected value display, value */
        font-size: ${fontSize};
    }
    & button.MuiButton-root[role="close"] { /* clear X button */
        position: absolute;
        right: 10px;
        visibility: hidden;
    }
    &:hover {
        & .MuiButton-root[role="close"] {
            visibility: visible;
        }
    }
`

// for Select, MultiSelect and TextInput control
export const FormControl = styled(MuiFormControl)`
    transition-duration: 0s;
    transform: translateY(4px);
    & .MuiInputLabel-shrink.MuiFormLabel-filled {
        visibility: hidden;
    }
`

// for Checkbox label control
export const FormControlLabel = styled(MuiFormControlLabel)`
    padding-left: ${spacing2X}px;
    padding-right: ${spacingX}px;
    margin: 0px;
    & .MuiFormControlLabel-label { /* label */
        font-size: ${fontSize};
        padding-left: ${spacingX}px;
    }
`

// for Select and MultiSelect label control
export const InputLabel = styled(MuiInputLabel)`
    font-size: ${fontSize};
    line-height: ${rowHeight2}px;
    transform: translate(0px, 1px) !important;
    padding-left: ${spacingX}px;
    &.Mui-focused { /* overwrite Mui default setting */
        transform: translate(0px, 1px) !important;
        padding-left: ${spacingX}px;
    }
`