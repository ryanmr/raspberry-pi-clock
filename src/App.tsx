import { useEffect, useState } from "react";
import { format } from "date-fns";
import { format as formatTz, utcToZonedTime } from "date-fns-tz";

type TzList = {
  name: string;
  tzName: string;
}[];

const timezones: TzList = [
  {
    name: "India",
    tzName: "Asia/Kolkata",
  },
  {
    name: "California",
    tzName: "US/Pacific",
  },
  {
    name: "New York",
    tzName: "US/Eastern",
  },
  {
    name: "Brazil",
    tzName: "America/Sao_Paulo",
  },
  {
    name: "London",
    tzName: "Europe/London",
  },
  {
    name: "China",
    tzName: "Asia/Shanghai",
  },
  {
    name: "Tokyo",
    tzName: "Asia/Tokyo",
  },
  {
    name: "Amsterdam",
    tzName: "Europe/Brussels",
  },
];

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    function fn() {
      setDate(new Date());
    }

    const handle = setInterval(fn, 250);

    return () => {
      handle && clearInterval(handle);
    };
  }, []);

  const msg = "hi";

  return (
    <>
      <div className="grid h-screen grid-rows-6">
        <div className="flex flex-col items-center justify-center row-span-3">
          <div className="flex items-center justify-center w-full gap-4 font-bold">
            <h1 className="leading-none tracking-wide text-responsive-xl">
              <span>{format(date, "h")}</span>
              <span className={date.getSeconds() % 2 ? `text-stone-700` : ``}>
                :
              </span>
              <span>{format(date, "mm")}</span>
            </h1>
            <div className="flex flex-col items-start">
              <h1 className="text-3xl">{format(date, "ss")}</h1>
              <div className="text-3xl">{format(date, "bb")}</div>
            </div>
          </div>
          <div className="text-center text-responsive-lg">
            {format(date, "EEEE, LLLL io yyy")}
          </div>
        </div>

        <Weather />
        <Timezones date={date} />
      </div>
    </>
  );
}

function Weather() {
  return (
    <div className="grid grid-cols-4 border-t divide-x border-stone-600 divide-stone-600">
      <div className="flex items-center justify-center text-6xl font-bold">
        <span>{defaultWeatherData.current.temp}</span>
        <span className="text-4xl text-stone-600">°F</span>
      </div>

      <div className="flex items-center justify-center text-6xl font-bold">
        <span>{defaultWeatherData.current.humidity}</span>
        <span>{defaultWeatherData.current.dew_point}</span>
        <span className="text-4xl text-stone-600">°F</span>
      </div>

      <div className="flex items-center justify-center text-6xl font-bold">
        <span>{defaultWeatherData.current.temp}</span>
        <span className="text-4xl text-stone-600">°F</span>
      </div>

      <div className="flex items-center justify-center text-6xl font-bold">
        <span>{defaultWeatherData.current.temp}</span>
        <span className="text-4xl text-stone-600">°F</span>
      </div>
    </div>
  );
}

function convertToTz(date: Date, tz: string) {
  const zonedDate = utcToZonedTime(date, tz);
  return zonedDate;
}

export function Timezones({ date }: { date: Date }) {
  const row1 = timezones.slice(0, Math.floor(timezones.length / 2));
  const row2 = timezones.slice(Math.floor(timezones.length / 2));

  return (
    <div className="grid grid-rows-2 row-span-3">
      {[row1, row2].map((row) => (
        <div className="grid grid-cols-4 divide-x divide-stone-600">
          {row.map((tz) => {
            const dateTz = convertToTz(date, tz.tzName);
            return (
              <div
                key={tz.name}
                className="relative flex flex-col justify-center p-4 text-center border-t text-stone-300 border-t-stone-600"
              >
                <div>
                  <h1 className="text-6xl font-bold leading-none tracking-wide">
                    <span>
                      {formatTz(dateTz, "h", { timeZone: tz.tzName })}
                    </span>
                    <span>:</span>
                    <span>
                      {formatTz(dateTz, "mm", { timeZone: tz.tzName })}
                    </span>
                    <span className="text-lg text-stone-500">
                      {formatTz(dateTz, "bb", { timeZone: tz.tzName })}
                    </span>
                  </h1>
                  <h1 className="font-bold">{tz.name}</h1>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const defaultWeatherData = {
  lat: 44.9676,
  lon: -93.1774,
  timezone: "America/Chicago",
  timezone_offset: -21600,
  current: {
    dt: 1707189382,
    sunrise: 1707139694,
    sunset: 1707175508,
    temp: 34.77,
    feels_like: 30.69,
    pressure: 1019,
    humidity: 81,
    dew_point: 29.84,
    uvi: 0,
    clouds: 0,
    visibility: 10000,
    wind_speed: 4.61,
    wind_deg: 150,
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01n",
      },
    ],
  },
};

export default App;
