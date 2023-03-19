import React from 'react';
import Plot from 'react-plotly.js';

export function Piechart(probs) {
  return (
    <Plot
      data={[
        {
          labels: ['a', 'b'],
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
          x: probs.locations,
          y: probs.death_counts,
          type: "bar"
        }
      ]}
      layout={{ title: 'Top 3 accidents', autosize: true }}
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
      layout={{ title: 'Accident Count', autosize: true }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }}
    />
  );
}