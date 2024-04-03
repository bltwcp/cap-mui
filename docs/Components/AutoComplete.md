# AutoComplete
核心為mui AutoComplete的CAP style AutoComplete元件

##### 使用範例
```
const options = ['1', '2', '3', '4', '5']
<AutoComplete
  label='your choice'
  options={options}
  limitTags={3}
/>
```

##### 說明
mui auto complete元件提供了數個功能
* 搜尋options中的內容
* multi select功能
* 確定auto complete選擇的值必定存在於options內
* 選擇的內容以tag方式顯示於input box內

##### 輸入
* label: 顯示於左側的文字 + ":"，型態為string (optional)
* **options**: 可以選擇的options，型態為string[] (required)
* limitTags: 未focus時，最多顯示的tag數量，預設為3 (optional)
* onChange: 選擇有變更時的行為，型態為(values: string[]) => void (optional)
* placeholder: 無選擇時的顯示值，型態為string，預設為ALL (optional)
* defaultValues: 預設已選擇的值，型態為string[] (optional)
* tooltip: tooltip的形式，可選擇'none', 'verticle'或'horizontal'，預設為verticle (optional)
* sx: 額外客製化AutoComplete style，型態為SxProps<Theme> (optional)
* inputSx: 額外客製化input field style，型態為SxProps<Theme> (optional)
* disabled: 關閉被操作權，預設為false (optional)