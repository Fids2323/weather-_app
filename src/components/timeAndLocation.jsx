import React from "react";
import {formatToLocalTime} from "../services/weatherService";

function TimeAndLocation({weather: {dt, timezone, name, country}}) {
	return (
		<div>
			<div className="flex items-center justify-center my-4">
				<div className=" text-sm sm:text-xl text-white font-extralight">{formatToLocalTime(dt, timezone)}</div>
			</div>
			<div className="flex items-center justify-center my-2">
				<p className="text-white text-2xl sm:text-3xl font-medium">{`${name}, ${country}`}</p>
			</div>
		</div>
	);
}

export default TimeAndLocation;
