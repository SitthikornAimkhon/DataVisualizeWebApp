const plotly = require('plotly')("atomu78", "wVM7td9wVVVmC67H6FBi"); // Replace with your Plotly username and API key

// Define data
const dimension1_name = 'Dimension 1';
const dimension2_name = 'Dimension 2';
const measurement = ['Measurement 1', 'Measurement 2', 'Measurement 3'];
const measurement1 = [20, 25, 30];
const measurement2 = [15, 18, 25];


function plot2dimen(dimension1_name, dimension2_name, measurement, measurement1, measurement2) {
    const trace1 = {
        x: measurement,
        y: measurement1,
        name: dimension1_name,
        type: 'bar'
    };
    const trace2 = {
        x: measurement,
        y: measurement2,
        name: dimension2_name,
        type: 'bar'
    };
    const layout = {
        barmode: 'group',
        title: 'Bar Chart with Two Dimensions and Measurements',
        xaxis: {title: 'Dimension'},
        yaxis: {title: 'Measurement'}
    };
    const data = [trace1, trace2];
    const graphOptions = {
        layout: layout,
        filename: 'bar-chart',
        fileopt: 'overwrite'
    };
    plotly.plot(data, graphOptions, function (err, chart) {
        if (err) console.log(err);
        console.log(chart.url);
    });};

function plot1dimen(dimension1_name, measurement, measurement1) {
    const trace1 = {
        x: measurement,
        y: measurement1,
        name: dimension1_name,
        type: 'bar'
    };
    const layout = {
        barmode: 'group',
        title: 'Bar Chart with One Dimensions and Measurements',
        xaxis: {title: 'Dimension'},
        yaxis: {title: 'Measurement'}
    };
    const data = [trace1];
    const graphOptions = {
        layout: layout,
        filename: 'bar-chart',
        fileopt: 'overwrite'
    };
    plotly.plot(data, graphOptions, function (err, chart) {
        if (err) console.log(err);
        console.log(chart.url);
    });};


function generatePieChart(labels, values) {
        const data = [
          {
            values: values,
            labels: labels,
            type: 'pie'
          }
        ];
        const layout = {
            height: 400,
            width: 500,
            title:'Pie Chart'
        };
        const graphOptions = {
            layout: layout,
            filename: 'pie-chart',
            fileopt: 'overwrite'
        };
      
        plotly.plot(data, graphOptions, function (err, chart) {
          if (err) return console.log(err);
          console.log(chart.url);
        });
      }

function createLineChart(xValues, yValues, xTitle, yTitle) {
        const trace = {
          x: xValues,
          y: yValues,
          type: 'scatter'
        };
      
        const layout = {
          title: 'line chart',
          xaxis: {
            title: xTitle
          },
          yaxis: {
            title: yTitle
          }
        };
      
        const data = [trace];
        const graphOptions = {layout: layout, filename: 'line-chart', fileopt: 'overwrite'};
      
        plotly.plot(data, graphOptions, function (err, chart) {
            if (err) return console.log(err);
            console.log(chart.url);
          });
      }      
      
// plot2dimen(dimension1_name,dimension2_name,measurement,measurement1,measurement2)
// plot1dimen(dimension1_name,measurement,measurement1)
// generatePieChart(measurement,measurement1)
createLineChart(measurement1,measurement2,"x","y")