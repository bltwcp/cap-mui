# StackTabs
StackTabs提供CAP style stacked tab，用於垂直化的tab切換畫面與功能

##### 使用範例
```
const handleCurrentTabChange = (currentTab: number) => {
    //do something...
}

<StackTabs
  tabs={['tab 1', 'tab 2']}
  onTabChange={handleCurrentTabChange}
/>
```

##### 說明
StackTabs與Tabs不同的，有處理tab bar與tab切換功能
StackTabs在垂直向的順序為
  - tab 0 bar
  - tab 0 content
  - tab 1 bar
  - tab 1 content
  - ...
隨著當下的currentTab，顯示或隱藏content區域
tab編號由0開始依序遞增
使用者可以點擊tab bar切換到該tab (顯示該tab content，同時隱藏其他tab content)

##### 輸入
* initialTab: 預設所在的tab編號，型態為number (optional)
* currentTab: 設定目前所在的tab編號，型態為number (optional)
* **tabs**: tab名稱，型態為string[] (required)
* anchorEl: 指定綁在該元件下方， (optional)
* hideMethod: 未顯示的tab content隱藏方式，可以選擇"none", "nodisplay", "hide"，預設為none (optional)
* onTabChange: tab切換時的callback，型態為(tab: number) => void (optional)
* tabSx: 客製tab content style，型態為SxProps<Theme> (optional)
* sx: 客製tab bar style，型態為SxProps<Theme> (optional)