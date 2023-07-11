import React, { useState, useEffect } from "react";
import LoaderComponent from "./Components/Loader";
import HolidayHeader from "./Components/Header";
import HolidayForm from "./Components/Form";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <HolidayHeader />
          <HolidayForm />
        </>
      )}
    </div>
  );
};

export default App;
