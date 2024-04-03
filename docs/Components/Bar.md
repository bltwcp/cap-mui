# Bar 與 Bars
Bar提供建立一橫條區域，並於內部放置元件
Bars提供數組Bar成一個群體控制的區塊

##### 使用範例
```
<Bars>
  <Bar>
    <Component1 />
    <Component2 />
  </Bar>
  <Bar>
    <Component3 />
  </Bar>
</Bars>
```

##### 說明
放置於Bar內的component會依序的排列下去，彼此之間可以透過設定padding與margin讓Component之間有間隔。
Bar的高度會因放置於Bar內的Component最大高度而定，且沒有寬度限制。這邊需要注意，在Bar放置過多元件會導致後方的元件會因瀏覽器寬度切割而無法顯示。
當有**過多元件的需求**時，可以利用Bars將提供橫向scrollbar的功能。
注意，放置於內的component必須要是display: 'inline-block'，不然會因css設定而換行

##### Bar輸入
* sx: 額外客製化style，型態為SxProps<Theme> (optional)

##### Bars輸入
* progressBar: 顯示progress bar，型態為boolean (optional)
* progressBarSx: progress bar額外客製化style，型態為SxProps<Theme>，預設progress bar style會位於Bars最上方 (optional)