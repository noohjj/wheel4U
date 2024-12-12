import { useEffect, useState } from "react";
import { WheelData } from "../../api";
import Banner from "../../components/Banner";

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

  return <Banner />;
};

export default Home;
