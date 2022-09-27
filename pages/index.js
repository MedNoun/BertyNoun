import Navbar from "../components/Navbar";
import handler from "./api/staticdata";
import MedNoun from "../components/MedNoun";
import Image from "next/image";
import Mic from "../components/Mic";


function Home({ response }) {
  let image = { width: "450", height: "910" };

  return (
    <div className="main">
      <Navbar data={response.navbar} />
      <MedNoun url={response.imgUrl} />
      <Mic />
    </div>
  );
}
export const getStaticProps = async (context) => {
  const response = await handler();
  return {
    props: { response },
  };
};
export default Home;
