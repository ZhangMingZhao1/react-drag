const echartConfig = {
    line: [
        {
            title: '值轴/Y',
            key: 'yAxis',
            dropItem: 2,
            type: 'value',
            length: 10,
            dec: 'y轴，数据类型为数字！',
            chartSelectOpt: [{
                name: '条形图',
                value: 'line'
            }, {
                name: '柱状图',
                value: 'bar'
            }],
            items: []
        }
    ]
}

export default echartConfig;