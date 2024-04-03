import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback, memo, } from 'react';
import { Typography, } from '@mui/material';
import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { Button, ExcelButton, Report, TabPanels, //LoadingTheme,
Bar, Bars, Tabs, Grid, gridStyleFactory, gridMaxWidth, Checkbox, MultiSelect, DateRangePicker, DatePicker, TextInput, NumberValidator, Autocomplete } from '../Components';
import { PaymentSelect, PortSelect, VendorAgentSelect, OrderTypeSelect, VendorSelect, BOLStageSelect, POStageSelect, PHierarchyComponent, CHierarchyComponent, SCMSComponent, SearchOption, DateFormat, VendorTypeSelect, } from '../Cap';
import { StartSpan, /*InjectHeader,*/ } from '../Utils/tracer';
const rows = [
    {
        id: 1,
        expand: true,
        phierarchy: 'Merchandise',
        totalQty: 54818,
        poQty: 21288,
        poUnitCost: 'RMB 25.34\nUSD 5.31',
        poAMT: 'RMB 391120.31\nUSD 98765.04',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 2,
        parentId: 1,
        expand: true,
        phierarchy: 'SPORTING GOODS',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 3,
        parentId: 2,
        phierarchy: 'Free Weights',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 4,
        parentId: 3,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 5,
        parentId: 3,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 6,
        parentId: 0,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 7,
        parentId: 6,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    /*{
        id: 8,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 9,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 10,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 11,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 12,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 13,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 14,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 15,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 16,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 17,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 18,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 19,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 20,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 21,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 22,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 23,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 24,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 25,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 26,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 27,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 28,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },
    {
        id: 29,
        parentId: 7,
        phierarchy: 'SD / KB',
        totalQty: 54728,
        poQty: 21288,
        poUnitCost: 'RMB 25.34',
        poAMT: 'RMB 391120.31',
        poNW_LB: 294300,
        bolQty: 33530,
        bolUnitCost: 'RMB 27.13',
        bolAMT: 'RMB 883777.31',
        bolNW_LB: 403151,
    },*/
];
const columns1 = [
    {
        Header: 'a',
        id: 'a',
        sticky: 'left',
    },
    {
        Header: 'b',
        id: 'b',
        width: 300,
    },
    {
        Header: 'c',
        id: 'c',
        width: 500,
    },
    {
        Header: 'd',
        id: 'd',
        width: 700,
    },
];
const columns2 = [
    {
        Header: ' ',
        columns: [
            {
                id: 'totalQty',
                Header: 'TOTAL QTY',
                accessor: (row) => (_jsx(Typography, { align: 'right', sx: { paddingRight: '2px', fontSize: '13px', }, children: row['totalQty'] })),
                width: 100,
                resizable: true,
                sortable: true,
            },
            {
                //id: 'phierarchy', // id is not necessary when accessor is a string
                Header: 'P Hierarchy',
                accessor: 'phierarchy',
                width: 300,
                resizable: true, // allow for change width
            },
        ],
        sticky: 'left',
        resizable: true, // ground resize
    },
    {
        id: 'po',
        Header: 'PO',
        headerStyle: {
            textAlign: 'left',
        },
        columns: [
            {
                Header: 'PO ORDER QTY',
                accessor: 'poQty',
                width: gridMaxWidth('PO ORDER QTY', 'poQty', rows, '16px Arial') + 10,
                headerStyle: {
                    color: 'red',
                    backgroundColor: 'blue',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                },
                resizable: true,
            },
            {
                id: 'poUnitCost',
                Header: 'PO UNIT COST',
                accessor: (row, index) => {
                    const lines = (row['poUnitCost'] ?? '').split('\n');
                    return (_jsx(Typography, { component: 'span', sx: { display: 'block', fontSize: '13px', }, children: lines.map((line, lineIndex) => {
                            const lineContents = line.split(' ');
                            return _jsx(Typography, { component: 'span', sx: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', }, children: lineContents.map((content, contentIndex) => _jsx("span", { style: { paddingLeft: '2px', paddingRight: '2px' }, children: content }, `row${index}_line${lineIndex}_${contentIndex}`)) }, `row${index}_line${lineIndex}`);
                        }) }));
                },
                width: 150,
            },
            {
                Header: 'PO AMT',
                accessor: 'poAMT',
                width: 150,
            },
            {
                Header: 'PO NW:LB',
                accessor: 'poNW_LB',
                width: 100,
                hidden: true,
            },
        ],
    },
    {
        id: 'bol',
        Header: 'BOL',
        columns: [
            {
                Header: 'BOL QTY',
                accessor: 'bolQty',
                width: 150,
            },
            {
                Header: 'BOL UNIT COST',
                accessor: 'bolUnitCost',
                width: 150,
            },
            {
                Header: 'BOL AMT',
                accessor: 'bolAMT',
                width: 150,
            },
            {
                Header: 'BOL NW:LB',
                accessor: 'bolNW_LB',
                width: 100,
            },
        ]
    },
];
const cols1 = [
    {
        Header: 'title A',
        sticky: 'left',
        accessor: 'a',
    },
    {
        id: 'b',
        Header: 'title B',
        accessor: 'b alias',
    },
    {
        id: 'c',
        Header: 'title C',
        accessor: (row) => row.enabled
            ? _jsx("span", { "data-testid": 'ce', children: row.c })
            : _jsx("span", { "data-testid": 'cd', children: "null" })
    }
];
const rows1 = [
    {
        id: 1,
        a: 'A1',
        b: 'B origin',
        'b alias': 'B1',
        enabled: true,
        c: 'C1',
    },
    {
        id: 2,
        parentId: 1,
        a: 'A2',
        'b alias': 'B2',
        enabled: false,
        c: 'C2',
    },
];
// export excel style & column style
const gridStyle = gridStyleFactory({
    '& .poColumn': { backgroundColor: '#D9E1F2', fontWeight: 'bold' },
    '& .poQtyColumn': { backgroundColor: '#d9e1f2', textAlign: 'center' },
    '& .bolColumn': { backgroundColor: '#FFF2CC', color: '#FF0000' },
    //'& .otherColumn': { backgroundColor: '#fff' },
});
function customCellName(field, row, value) {
    if (field === 'poQty')
        return 'poQtyColumn';
    if (field.includes('po'))
        return 'poColumn';
    if (field.includes('bol'))
        return 'bolColumn';
    return 'otherColumn';
}
const tabs = ['empty', 'tab 1', 'tabtab 2'];
const PaymentSelectMemo = memo(PaymentSelect);
const PortSelectMemo = memo(PortSelect);
const VendorAgentSelectMemo = memo(VendorAgentSelect, (pre, next) => pre.disabled === next.disabled);
export const Demo = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [payments, setPayments] = useState([]);
    const [agents, setAgents] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);
    const [comparison, setComparison] = useState(true);
    const grid0Ref = useRef(null);
    const grid1Ref = useRef(null);
    const preGridRef = useRef(null);
    const handlePaymentChange = (selectPayments) => {
        setPayments(selectPayments);
    };
    const handlePortChange = (selectPorts) => {
        console.log(selectPorts);
    };
    const handleAgentChange = (selectedAgents) => {
        setAgents(selectedAgents);
    };
    const handleOrderTypeChange = (selectedOrderTypes) => {
        setOrderTypes(selectedOrderTypes);
    };
    const handleVendorChange = (selectedVendors) => {
        console.log(selectedVendors);
    };
    const handlePOStageChange = (selectedPOStages) => {
        console.log(selectedPOStages);
    };
    const handleBOLStageChange = (selectedBOLStages) => {
        console.log(selectedBOLStages);
    };
    const handleComparisonChecked = (checked) => {
        setComparison(checked);
    };
    const handleCurrentTabChange = (tab) => setCurrentTab(tab);
    const exportExcel = () => {
        try {
            let workbook = new Excel.Workbook();
            const sheet0 = workbook.addWorksheet('grid0');
            grid1Ref.current?.fillExcelSheet(sheet0);
            workbook.xlsx.writeBuffer().then((buffer) => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
                saveAs(blob, `mui.xlsx`, { autoBom: true });
            });
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleHeaderCellClick = (columnID) => {
        if (columnID === 'poQty')
            grid1Ref.current?.hideColumns(['poAMT']);
        if (columnID === 'po')
            grid1Ref.current?.showColumns(['poAMT', 'poNW_LB']);
    };
    return (_jsxs(Report, { title: 'Report', children: [_jsx(Tabs, { tabs: tabs, onTabChange: useCallback(handleCurrentTabChange, []), freezeTabs: 2 }), _jsxs(Bars, { progressBar: true, ref: preGridRef, children: [" ", _jsxs(Bar, { children: [_jsx(Autocomplete, { label: 'test', options: ['Albert', 'Alan', 'Bob', 'Kevin', 'Carter', 'Jenifer'], limitTags: 2, sx: { width: '250px' } }), _jsx(PaymentSelectMemo, { onChange: useCallback(handlePaymentChange, []) }), _jsx(PortSelectMemo, { onChange: useCallback(handlePortChange, []) }), _jsx(VendorAgentSelectMemo, { onChange: handleAgentChange }), _jsx(OrderTypeSelect, { onChange: useCallback(handleOrderTypeChange, []) }), _jsx(VendorSelect, { onChange: useCallback(handleVendorChange, []), pHierarchies: ['Merchandise'], orderTypes: orderTypes, payments: payments, agents: agents }), _jsx(POStageSelect, { onChange: useCallback(handlePOStageChange, []) }), _jsx(BOLStageSelect, { onChange: useCallback(handleBOLStageChange, []) })] }), _jsxs(Bar, { children: [_jsx(Checkbox, { label: 'Comparison', onChange: handleComparisonChecked, checked: comparison }), _jsx(DateRangePicker
                            //disabled={true}
                            , { 
                                //disabled={true}
                                label: 'option', periods: ['Date', 'Week', 'Month', 'Quarter', 'Year'], defaultPeriod: 'Date', startYear: 2000, onRangeChange: (from, to) => console.log(from, to), tipDate2StrFn: DateFormat }), _jsx(PaymentSelect, { value: payments, onChange: handlePaymentChange }), _jsx(PortSelect, { label: 'POL' }), _jsx(VendorAgentSelect, {}), _jsx(VendorTypeSelect, {}), _jsx(Button, { name: 'tracer', onClick: async () => {
                                    const span = StartSpan('go');
                                    console.log('go');
                                    setComparison(!comparison);
                                    span.end();
                                }, sx: { marginLeft: '30px' }, children: "GO" }), _jsx(ExcelButton, { onClick: () => exportExcel(), sx: { marginLeft: '30px' } })] }), _jsxs(Bar, { children: [_jsx(Checkbox, { label: 'Comparison', onChange: handleComparisonChecked, checked: comparison }), _jsx(MultiSelect, { label: 'Hierarchy select', menuItems: [
                                    {
                                        name: 'a',
                                    },
                                    {
                                        name: 'a1',
                                        parent: 'a',
                                    },
                                    {
                                        name: 'a2',
                                        parent: 'a',
                                    },
                                    {
                                        name: 'b',
                                    },
                                    {
                                        name: 'c',
                                        expand: true,
                                    },
                                    {
                                        name: 'c1',
                                        parent: 'c'
                                    },
                                ] }), _jsx(DatePicker, { value: new Date(), onChange: (v) => { } }), _jsx(TextInput, { label: 'number', validator: NumberValidator, placeholder: 'empty', placeholderColor: 'red' })] }), _jsxs(Bar, { children: [_jsx(SearchOption, {}), _jsx(PHierarchyComponent, { defaultSelected: 'Merchandise', 
                                //disabled={true}
                                onChange: useCallback((items) => console.log(items), []) }), _jsx(CHierarchyComponent, { defaultSelected: 'CAP GROUP,CAP N. America,CAP Asia/Pacific', onChange: useCallback((items) => console.log(items), []) }), _jsx(SCMSComponent
                            //defaultSelected='SC3 TRADING CO, SC4 WHOLESALE CO'
                            , { 
                                //defaultSelected='SC3 TRADING CO, SC4 WHOLESALE CO'
                                onChange: useCallback((items) => console.log(items), []) })] })] }), _jsxs(TabPanels, { anchorEl: preGridRef.current, currentTab: currentTab, children: [_jsx(Grid
                    //columns={columns}
                    //emptyDisplay={() => <span>123</span>}
                    //emptyDisplay='321'
                    , { 
                        //columns={columns}
                        //emptyDisplay={() => <span>123</span>}
                        //emptyDisplay='321'
                        columns: cols1, rows: rows1, index: true, hierarchyColumns: ['a'] }), _jsx(Grid, { ref: grid0Ref, index: true, columns: columns1, rows: rows, sx: { ...gridStyle, height: 'calc(100vh - 227px)', width: '100%' }, 
                        //sx={{ ...gridStyle, height: '100%' }}
                        cellNameFn: customCellName, onHeaderClick: handleHeaderCellClick }), _jsx(Grid, { ref: grid1Ref, index: true, columns: columns2, rows: rows, sx: { ...gridStyle, height: '100%' }, cellNameFn: customCellName, onHeaderClick: handleHeaderCellClick, hierarchyColumns: ['phierarchy'] })] })] }));
};
