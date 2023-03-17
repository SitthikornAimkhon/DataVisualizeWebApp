import React from 'react';
import Plot from 'react-plotly.js';

export function Piechart(probs){
    return (
      <Plot
        data={[
          {
            labels:probs.labels, 
            values:probs.values,
            type: 'pie',
            marker: {colors:['rgb(33, 37, 41)','rgb(220,53,69)']}
          }
        ]}
        layout={ {width: 400, height: 600, title: 'Death & Injured ratio'} }
      />
    );
  }

export function Barchart(probs){
    return (
      <Plot
        data={[
          {
            x:probs.locations,
            y:probs.death_counts,
            type:"bar"
          }
        ]}
        layout={ {width: 400, height: 600, title: 'Top 3 accidents'} }
      />
    );
  }

export function Linechart(probs){
    return (
      <Plot
        data={[
            {
                x: probs.times,
                y: probs.death_counts,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
              },
        ]}
        layout={ {width: 700, height: 700, title: 'Accident Count'} }
      />
    );
  }