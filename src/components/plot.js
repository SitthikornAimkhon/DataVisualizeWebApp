import React from 'react';
import Plot from 'react-plotly.js';

export function Piechart(probs) {
  return (
    <Plot
      data={[
        {
          labels: ['Death', 'Injured'],
          values: probs.values,
          type: 'pie',
          marker: { colors: ['rgb(33, 37, 41)', 'rgb(220,53,69)'] }
        }
      ]}
      layout={{ autosize: true, title: 'Death & Injured ratio' }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}

    />
  );
}

export function Barchart(probs) {
  return (
    <Plot
      data={[
        {
          textposition:'inside',
          y: probs.locations,
          x: probs.death_counts,
          type: "bar",
          orientation: 'h',
          transforms: [{
            type: 'sort',
            target: 'x',
            order: 'asscending'
          }]
        }
      ]}
      layout={{
        // yaxis: { title: { text: 'Expressway Name' } },
        xaxis: { title: { text: 'Number of accidents' } , },
        title: 'Total Number of accidents',
        autosize: true
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function Linechart(probs) {
  return (
    <Plot
      data={[
        {
          x: probs.times,
          y: probs.death_counts,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ]}
      layout={{
        xaxis: { title: { text: 'Time' } },
        yaxis: { title: { text: 'Number of accidents' } },
        title: 'Accident Count',
        autosize: true
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
}