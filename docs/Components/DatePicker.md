# DatePicker
核心為mui DatePicker的CAP style DatePicker元件

##### 使用範例
```
<DatePicker
  value={new Date()}
/>
```

##### 說明
基於mui lab date picker的date picker元件
等mui將date picker轉為標準元件後，會再次改版

##### 輸入
* initialValue: 預設選擇的時間，型態為Date，預設為當下日期 (optional)
* value: 目前選擇的時間，型態為Date (optional)
* disabled: 停止元件操作權限，型態為boolean，預設為false (optional)
* onChange: 選擇時間有變更時的callback function，型態為(date: Date | null | undefined) => void (optional)
* sx: 額外客製化DatePicker style，型態為SxProps<Theme> (optional)
