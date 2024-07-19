import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import classes from './Chart.module.css';


const Chart = ({ savingsRate }) => {
    console.log(savingsRate, "savingsRate")
    const savingsRateWithoutPercent = savingsRate?.replace('%', '');
    console.log(savingsRateWithoutPercent, 1111);
    const handleDataPointSelection = (event, chartContext, config) => {
        const clickedIndex = config.dataPointIndex;
        console.log(clickedIndex, "clickedIndex")
        setChartData({ ...chartData, selectedBarIndex: clickedIndex });
    };


    const [chartData, setChartData] = useState({
        series: [{
            name: "Years to retirement:",
           data :[
               { x: '0', y: 100},
               { x: '2', y: 98 },
               { x: '4', y: 96 },
               { x: '6', y: 94},
               { x: '8', y: 92 },
               { x: '10', y: 90 },
               { x: '12', y: 88 },
               { x: '14', y: 86 },
               { x: '16', y: 84 },
               { x: '18', y: 82 },
               { x: '20', y: 80 },
               { x: '22', y: 78 },
               { x: '24', y: 76 },
               { x: '26', y: 74 },
               { x: '28', y: 72},
               { x: '30', y: 70 },
               { x: '32', y: 68 },
               { x: '34', y: 66 },
               { x: '36', y: 64 },
               { x: '38', y: 62 },
               { x: '40', y: 60 },
               { x: '42', y: 58 },
               { x: '44', y: 56 },
               { x: '46', y: 54 },
               { x: '48', y: 52 },
               { x: '50', y: 50 },
               { x: '52', y: 48 },
               { x: '54', y: 46 },
               { x: '56', y: 44 },
               { x: '58', y: 42 },
               { x: '60', y: 40},
               { x: '62', y: 38},
               { x: '64', y: 36 },
               { x: '66', y: 34 },
               { x: '68', y: 32 },
               { x: '70', y: 30 },
               { x: '72', y: 28 },
               { x: '74', y: 26 },
               { x: '76', y: 24 },
               { x: '78', y: 22 },
               { x: '80', y: 20 },
               { x: '82', y: 18 },
               { x: '84', y: 16 },
               { x: '86', y: 14 },
               { x: '88', y: 12 },
               { x: '90', y: 10 },
               { x: '92', y: 8 },
               { x: '94', y: 6 },
               { x: '96', y: 4 },
               { x: '98', y: 2 },
               { x: '100', y: 0 }
               //     fillColor: '#2191EE',
               //     strokeColor: '#C23829' },
           ]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 380,
                events:{
                dataPointSelection: handleDataPointSelection
    },
                // events:{
                //     dataPointSelection:(event, chartContext, config)=>{
                //         console.log(event, chartContext, config, "hi")
                //         console.log(config.dataPointIndex * 2, 'kkkkkk')
                //         const clickedIndex = config.dataPointIndex;
                //         // Update the selectedBarIndex state to track the clicked bar
                //         // setChartData({ ...chartData, selectedBarIndex: clickedIndex });
                //     }
                // }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '100%',
                    endingShape: 'flat',
                    distributed: true,
                },
            },
            xaxis: {
                type: 'category',
                title: {
                    text: 'Savings rate',
                    style:{
                        color:"#1f0007",
                        // color: "#000C1F",
                        fontSize: '20px',
                        fontWeight: 700,
                    },
                },
                labels: {
                    formatter: function (val) {
                        if (`${val}%` === `${savingsRate}`) {
                            return {
                                style: {
                                    color: 'red',
                                    fillColor: 'red'
                                },
                                text: val,
                            }
                        }
                        return val;
                    },
                },
            },
            yaxis: {
                title: {
                    text: 'Years to retirement ',
                    style:{
                        color: "#000C1F",
                        fontSize: '16px',
                        fontWeight: 700,
                    },
                },
            },
            title: {
                text: '*Avg Household Saving Rates (2008) Sources: OECD, IMF',
                style:{
                    color: "#000C1F",
                    fontSize: '14px',
                    fontWeight: 400,
                },
            },
            tooltip: {
                x: {
                    formatter: function(val) {
                        return "Avg savings rate: " + val;
                    }
                },
                y: {
                    formatter: function(val) {
                        return  val;
                    }
                }
            },
            colors:['#383838', '#444','#4F4F4F', '#575757', '#5A5A5A','#5B5B5B', '#5C5C5C', '#5D5D5D', '#5E5E5E',
                '#5F5F5F', '#606060', '#616161', '#626262', '#636363', '#656565','#686868', '#6C6C6C','#6F6F6F',
                '#747474', '#777', '#7B7B7B', '#808080','#848484', '#888', '#8D8D8D','#989898','#A3A3A3','#989898',
                '#ACACAC', '#B8B8B8', '#BDBDBD', '#C1C1C1', '#C8C8C8','#CCC', '#CFCFCF', '#D3D3D3', '#DDD',
                '#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD',
                '#DDD','#DDD','#DDD','#DDD','#DDD',  '#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD',
                '#DDD','#DDD','#DDD','#DDD',  '#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD',
                '#DDD','#DDD','#DDD', '#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD','#DDD']
        },
        selectedBarIndex: null
    });


    useEffect(() => {
        let updatedSeries = chartData.series[0].data.map(item => {
            if (item.x === savingsRateWithoutPercent) {
                return { ...item,  fillColor: '#FEED55'  };
            }
            else if(Number(item.x) ===Number(savingsRateWithoutPercent) - 1){
                return { ...item,
                    fillColor: '#107DD7'
                };
            }
            return { ...item, fillColor: "" }
            // return { ...item, fillColor: "" };
        });
        console.log(updatedSeries, 1111111)
        setChartData(prevState => ({
            ...prevState,
            series: [{ ...prevState.series[0], data: updatedSeries }]
        }));
    }, [savingsRateWithoutPercent]);


    useEffect(() => {
        let updatedSeries = chartData.series[0].data.map(item => {
            return { ...item, fillColor: "" };
        });
        setChartData(prevState => ({
            ...prevState,
            series: [{ ...prevState.series[0], data: updatedSeries }]
        }));
    }, []);


    return (
        <div className={classes.chartDiv}>
            <div id="chart" className={classes.chartStyle}>
                <ReactApexChart options={chartData.options}
                                series={chartData.series}
                                type="bar" height={380}
                                // style={{
                                //     fill: ({ seriesIndex, dataPointIndex }) =>
                                //         chartData.series[seriesIndex]?.data[dataPointIndex]?.active ? 'red' : null,
                                //     stroke: ({ seriesIndex, dataPointIndex }) =>
                                //         chartData.series[seriesIndex]?.data[dataPointIndex]?.borderColor || 'transparent'
                                // }}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default Chart;
