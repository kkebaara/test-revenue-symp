// src/data/heatmapData.js
export const countryData = [
	{
		type: 'choropleth',
		locations: ['USA', 'Canada', 'Mexico', 'UK', 'France'],
		z: [100, 80, 60, 70, 90],
		locationmode: 'country names',
		colorscale: 'Reds',
	},
];

export const layout = {
	title: 'Global Sales Distribution',
	geo: {
		scope: 'world',
		projection: {
			type: 'equirectangular',
		},
	},
};
