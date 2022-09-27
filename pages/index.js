import Navbar from "../components/Navbar";
import handler from "./api/staticdata";
import MedNoun from "../components/MedNoun";
import Image from "next/image";
import Mic from "../components/Mic";

function Home({ response }) {
  let image = { width: "450", height: "910" };

  return (
    <div className="main">
      <Navbar key="navbar" data={response.navbar} />
      <MedNoun key="MedNoun" url={response.imgUrl} />
      <Mic
        key="Mic"
        passage={response.passage}
        combinations={response.word_combinations}
        pages={response.navbar.items}
      />
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
