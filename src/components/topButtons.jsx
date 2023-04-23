import React from "react";

function TopButtons({onSelect}) {
	const cities = [
		{
			id: 1,
			title: "London",
		},
		{
			id: 2,
			title: "Sydney",
		},
		{
			id: 3,
			title: "Tokio",
		},
		{
			id: 4,
			title: "Toronto",
		},
		{
			id: 5,
			title: "Paris",
		},
	];
	return (
		<div className="flex items-center justify-around my-6">
			{cities.map((city) => (
				<button key={city.id} className="text-sm text-white sm:text-lg font-medium" onClick={() => onSelect({q: city.title})}>
					{city.title}
				</button>
			))}
		</div>
	);
}

export default TopButtons;
