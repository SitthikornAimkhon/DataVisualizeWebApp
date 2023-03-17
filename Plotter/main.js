const express = require('express');
const app = express();
const plotly = require('plotly')("atomu78", "wVM7td9wVVVmC67H6FBi"); // Replace with your Plotly username and API key

// Define data
const data = [
    {
        labels: ['Apples', 'Oranges', 'Bananas', 'Pears'],
        values: [20, 25, 30, 10],
        type: 'pie'
    }
];

// Define layout
const layout = {
    title: 'Pie Chart Example'
};

// Define plotly graph options
const graphOptions = {
    layout: layout,
    filename: 'pie-chart',
    fileopt: 'overwrite'
};

// Create plotly chart
plotly.plot(data, graphOptions, function (err, chart) {
    if (err) console.log(err);
    console.log(chart.url);
});

// Serve plotly chart as static file
app.use(express.static('public'));

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});