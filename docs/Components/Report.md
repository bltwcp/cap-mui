# Report
Report是capmui最底層的元件，並顯示CAP style header row

##### 使用範例
```
<Report
  title='My Report'
>
  <Component />
</Report>
```

##### 說明
Report設計用來初始化capmui內會使用到的元件
- react query

在UI部分，主要目的是用於顯示title bar，title bar部分使用reportTheme
其child component部分，會將default theme指定為mainTheme

##### Report輸入
* title: title bar內顯示的字，型態為string (optional)
* bodySx: 型態為SxProps<Theme> (optional)
* titleSx: title文字額外客製化style，型態為SxProps<Theme> (optional)