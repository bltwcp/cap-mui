import { useState, useEffect, } from 'react'
import { Select, TextInput, } from '../Components'

interface SearchOptionProps {
    menuItems?: string[]
    emptyOption?: boolean
    disabled?: boolean
    onChange?: (topic: string, searchString: string) => void
}

export const SearchOption = (props: SearchOptionProps) => {
    const { onChange } = props
    const [topic, setTopic] = useState<string>('')
    const [searchString, setSearchString] = useState<string>('')

    useEffect(() => {
        const selectedTopic = topic === '　' ? '' : topic
        onChange && onChange(selectedTopic, searchString)
    }, [topic, searchString]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleItemChange = (topic: string | undefined) => setTopic(topic ?? '')
    const handleSearchStringChange = (search: string | undefined) => setSearchString(search ?? '')

    const menuItems = [
        props.emptyOption ? '　' : undefined,
        ...(props.menuItems ?? [])
    ].filter((item) => item)
    return (<>
        <Select
            label='Search Option'
            menuItems={menuItems as string[]}
            disabled={props.disabled}
            onChange={handleItemChange}
            clearable={true}
        />
        <TextInput
            onChange={handleSearchStringChange}
            sx={{ marginLeft: '2px' }}
        />
    </>)
}

export default SearchOption