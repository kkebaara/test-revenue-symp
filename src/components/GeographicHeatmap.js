// src/components/GeographicHeatmap.js
import React from 'react';
import Plot from 'react-plotly.js';

function GeographicHeatmap({ data, layout }) {
	return <Plot data={data} layout={layout} />;
}

export default GeographicHeatmap;
