# DateRangePicker
提供可切換時間維度，可選擇起訖的CAP style DatePicker元件

##### 使用範例
```
<DateRangePicker
  value={new Date()}
  periods={['Year', 'Month', 'Week']}
/>
```

##### 說明
1. 目前DateRangePicker有提供Date, Week, Month, Quarter, Year共5總區間可以選擇
2. 當periodic選擇為Date時，From/To會顯示DatePicker選擇日期，其餘都會顯示下拉式選單提供選擇
3. 下拉式選單可以透過startYear與endYear設定可供選擇的年份，第二個維度會因period選擇自動變換可以選擇的區間
   - Quarter: 1~4
   - Month: 1~12
   - Week: 1~53
4. 元件內部有設定起訖大小判斷
5. 每次選擇時都會誘發onRangeChange事件，其回傳值為編排過的起訖string
   - Period為Date時，回傳From/To string格式為YYYY/MM/DD，如2022/12/25
   - Period不為Date時，回傳From/To string格式為YYYYPSS，如2021, 2021Q03, 2022M03, 2022W43
6. 元件內有提供預設起訖為當前(啟動元件)日，week使用WMT Week當下週數

##### 輸入
* label: 顯示的title，型態為String (optioanl)
* periods: 可選擇的時間區間列表，型態為PeriodType[]，可列表的時間包含'Year', 'Quarter', 'Month', 'Week', 'Date'，預設為['Week', 'Month', 'Quarter', 'Year'] (optional)
* defaultPeriod: 預設的時間區間，型態為PeriodType，可為'Year', 'Quarter', 'Month', 'Week', 'Date'，預設為Week (optional)
* defaultFrom: 當period選擇為Date時，預設起始日期，型態為Date (optional)
* degfaultFromYear: 當period選擇不為Date時，預設起始年，型態為string (optional)
* defaultFromSub: 當period選擇不為Date與Year時，預設起始的第二個維度(季、月、週)，型態為string (optional)
* defaultTo: 當period選擇為Date時，預設截止日期，型態為Date (optional)
* defaultToYear: 當period選擇不為Date時，預設截止年，型態為string (optional)
* defaultToSub: 當period選擇不為Date與Year時，預設截止的第二個維度(季、月、週)，型態為string (optional)
* startYear: 當period選擇不為Date時，年份下拉選單可以選擇的最早年份，型態為number，預設為2000 (optional)
* disabled: 停用元件，型態為boolean，預設為false (optional)
* disabledSelect: 停用元件時顯示的狀態，型態為{Period: PeriodType, FromYear: string, FromtSub: string, ToYear: string, ToSub: string} (optional)
* onRangeChange: 選擇時間區建有變更時的callback function，型態為(from: string, to: string) => void (optional)
* tipDate2StrFn: period選擇不為Date時，第二維度Select的tip message，預設不啟用tip (optioanl)
