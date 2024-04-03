# MultiSelect
基於mui Select的CAP style MultiSelect元件

##### 使用範例
```
<MultiSelect
  label='select'
  menuItems={['option 1', 'option 2']}
/>
```

##### 說明
MultiSelect為多選下拉式選單，若不需要多選的需求請使用[Select](Select.md)
MultiSelect允許階層式選單，需要將menuItems的型態從`string`改為`{ name: string, parent?: string, expand?: boolean }`，在parent內填入父階層name，父階層也可以預設初始時是否展開(expand)

##### 輸入
* label: 顯示於左側的文字 + ":"，型態為string (optional)
* menuItems: 選項列表，型態為string[] | { name: string, parent?: string, expand?: boolean }[]，預設為[] (optional)
* value: 指定目前已選擇的value，型態為string[] (optional)
* initialSelected: 預設選擇的value，型態為string[]，預設為[] (optional)
* placeholder: 無選擇時顯示的字，型態為string，預設為"" (optioanl)
* placeholderColor: placeholder字樣的顏色，型態為string，預設為black (optional)
* selectedAtDisabled: 元件disabled時顯示的選擇，型態為string[] (optional)
* onChange: 選擇變更時觸發的callback，型態為(values: string[]) => void (optional)
* tooltip: 顯示tooltip方式，可以選擇'none', 'verticle', 'horizontal'，預設為verticle (optional)
* abbr: 選擇元件過多時的縮寫方式，可以選擇'...'或'selected'，預設為selected (optional)
* disabled: 元件操作權限，型態為boolean，預設為false (optional)
* sx：額外客製化Select style，型態為SxProps<Theme> (optional)
* menuItemSx: 額外客製化menu item style，型態為SxProps<Theme> (optional)
