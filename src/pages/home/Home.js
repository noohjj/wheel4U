import { useEffect, useState } from "react";
import { WheelData } from "../../api";

const Home = () => {
  const [wheel, setWheel] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const wheel = await WheelData();
        setWheel(wheel);
        console.log(wheel);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return;
};

export default Home;
