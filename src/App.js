// src/App.js
import React from 'react';
import GeographicHeatmap from './components/GeographicHeatmap'; // Adjust path if needed
import { countryData, layout } from './data/heatmapData'; //adjust path if needed.

function App() {
	return (
		<div>
			<h1>My Geographic Heatmap</h1>
			<GeographicHeatmap data={countryData} layout={layout} />
		</div>
	);
}

export default App;
