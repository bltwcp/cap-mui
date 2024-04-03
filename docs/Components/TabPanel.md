# TabPanels
整合多個panel並切換顯示的元件

##### 使用範例
```
<TabPanels
  currentTab={0}
>
  <Panel1 />
  <Panel2 />
  <Panel3 />
</TabPaenl>
```

##### 說明
TabPanels內依序放入個個panel元件，在TabPanels內會依序給每個元件編號(從0開始)，使用者透過控制currentTab來切換目前顯示的panel。
未顯示的panel會透過css設定不會顯示在畫面上，這邊提供使用者能藉由hideMethod參數控制不顯示的方式: 
* none: 不render元件，不透過css控制顯示；如果元件必須要存在於DOM，不可使用該設定
* hide: css內設定{overflow: 'hidden', height: '0px'}
* nodisplay: css內設定{display: 'none'}
hide與nodisplay兩種不顯示的方法最大的差別在於(預設)hide會實際rendering資料出來，因此在render時會比較慢，但是在切換時會比較順暢。

##### Report輸入
* anchorEl: 用於指定綁定的元件下方，用於自動配合視窗變化時切換顯示範圍 (optional)
* **currentTab**: 顯示的tab index，型態為number (required)
* hideMethod: 未顯示tab panel隱藏顯示的方法，可以為"none", "hide"或"nodisplay"，預設為hide (optional)