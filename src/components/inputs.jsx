import React, {useState} from "react";
import {UilSearch, UilLocationPoint} from "@iconscout/react-unicons";
import {toast} from "react-toastify";

function Inputs({setQuery, units, setUnits}) {
	const [city, setCity] = useState("");

	const handleSearchClick = () => {
		if (city !== "") {
			setQuery({q: city});
		}
	};

	const handleLocationClick = () => {
		if (navigator.geolocation) {
			toast.info("Fetching users location");
			navigator.geolocation.getCurrentPosition((position) => {
				toast.success("Location fetshed!");
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				setQuery({
					lat,
					lon,
				});
			});
		}
	};

	const handleUnitsChange = (e) => {
		const selectedUnit = e.currentTarget.name;
		if (units !== selectedUnit) setUnits(selectedUnit);
	};

	return (
		<div className="flex flex-col md:flex-row md:justify-center md:items-center md:space-x-4 my-6">
			<div className="flex flex-col gap-2 md:flex-row items-stretch w-full md:w-auto md:flex-1 md:items-center justify-center space-x-4">
				<input
					value={city}
					onChange={(e) => setCity(e.currentTarget.value)}
					type="text"
					placeholder="Search..."
					className="text-sm font-light mx-2 p-2 md:w-full md:text-xl md:w-auto shadow-xl focus:outline-none capitalize"
				/>

				<div className="flex items-center justify-between gap-4">
					<div className="flex">
						<UilSearch size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick} />
						<UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick} />
					</div>

					<div className="flex mr-4 sm:mr-0">
						<button name="metric" className="text-xl text-white font-light transition ease-out hover:scale-125" onClick={handleUnitsChange}>
							°C
						</button>
						<p className="text-xl text-white mx-1">|</p>
						<button name="imperial" className="text-xl text-white font-light transition ease-out hover:scale-125" onClick={handleUnitsChange}>
							°F
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Inputs;
