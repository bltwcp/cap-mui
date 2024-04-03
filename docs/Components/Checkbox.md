# Checkbox
核心為mui Checkbox的CAP style Checkbox元件

##### 使用範例
```
<Checkbox
  label='I agree'
/>
```

##### 說明
基本的Checkbox元件，基於mui Checkbox搭配FormControlLabel控制label顯示位置

##### 輸入
* label: 顯示於左側的文字，型態為string (optional)
* labelPlacement: label位置，可為'end', 'start', 'top', 'bottom'或undefined，預設為'end' (optional)
* checked: 已勾選，型態為boolean (optional)
* defaultChecked: 預設勾選狀態，型態為boolean (optional)
* disabled: 停用元件，型態為boolean (optional)
* onChange: 選擇有變更時的行為，型態為(checked: boolean) => void (optional)
* sx: 額外客製化AutoComplete style，型態為SxProps<Theme> (optional)

