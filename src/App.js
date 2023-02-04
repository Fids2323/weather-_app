import {useEffect, useState} from "react";
import "./App.css";
import Forecast from "./components/forecast";
import Inputs from "./components/inputs";
import TemperatureAndDetails from "./components/temperatureAndDetails";
import TimeAndLocation from "./components/timeAndLocation";
import TopButtons from "./components/topButtons";
import getFormattedWeatherData from "./services/weatherService";

function App() {
	const [query, setQuery] = useState({q: "moscow"});
	const [units, setUnits] = useState("metric");
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		const fetchWeather = async () => {
			await getFormattedWeatherData({...query, units}).then((data) => {
				setWeather(data);
			});
		};

		fetchWeather();
	}, [query, units]);

	return (
		<div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
			<TopButtons />
			<Inputs />

			{weather && (
				<>
					<TimeAndLocation />
					<TemperatureAndDetails />
					<Forecast title="hourly forecast" />
					<Forecast title="daily forecast" />
				</>
			)}
		</div>
	);
}

export default App;
