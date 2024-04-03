# TextInput
基於mui TextField的CAP style Input元件

##### 使用範例
```
<TextInput
  label='account'
/>
```

##### 說明
提供基本文字輸入的元件，並沒有檢核輸入內容的功能

##### 輸入
* label: 顯示於左側的文字 + ":"，型態為string (optional)
* value: 指定目前已選擇的value，型態為string (optional)
* placeholder: 無選擇時顯示的字，型態為string (optional)
* placeholderColor: placeholder字樣的顏色，型態為string，預設為black (optional)
* onChange: 觸發的callback型態為(value: string) => void (optional)
* validator: 內容合法性測試Fn，型態為(value: string) => boolean (optional)
* tooltipFn: 客製tooltip，型態為(value: string) => string | JSX.Element (optional)
* valueAtDisabled: 在disabled狀態下的值，型態為string (optional)
* disabled: 關閉元件操作權限，型態為boolean，預設為false (optional)
* sx：額外客製化Input style，型態為SxProps<Theme> (optional)
