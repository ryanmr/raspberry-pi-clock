import { useEffect, useState } from "react";
import { format } from "date-fns";

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

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="flex items-center justify-center w-full gap-4 font-bold">
            <h1 className="text-9xl">
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
          <div className="text-2xl text-center">
            {format(date, "EEEE, LLLL io yyy")}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
