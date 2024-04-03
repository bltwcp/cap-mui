# Select
基於mui Select的CAP style Select元件

##### 使用範例
```
<Select
  label='select'
  menuItems={['option 1', 'option 2']}
/>
```

##### 說明
Select為單選下拉式選單，若有多選的需求請改用[MultiSelect](MultiSelect.md)

##### 輸入
* label: 顯示於左側的文字 + ":"，型態為string (optional)
* menuItems: 選項列表，型態為string[]，預設為[] (optional)
* value: 指定目前已選擇的value，型態為string (optional)
* initialSelected: 預設選擇的value，型態為string (optional)
* placeholder: 無選擇時顯示的字，型態為string (optional)
* placeholderColor: placeholder字樣的顏色，型態為string (optional)
* selectedAtDisabled: 元件disabled時顯示的選擇項目，型態為string (optional)
* onChange: 選擇變更時觸發的callback，型態為(value: string) => void (optional)
* tooltip: 顯示tooltip，型態為boolean (optional)
* tooltipFn: 指定客製tooltip function，型態為(value: string) => string | JSX.Element (optional)
* disabled: 元件操作權限，型態為boolean，預設為false (optional)
* sx：額外客製化Select style，型態為SxProps<Theme> (optional)
* menuItemSx: 額外客製化menu item style，型態為SxProps<Theme> (optional)