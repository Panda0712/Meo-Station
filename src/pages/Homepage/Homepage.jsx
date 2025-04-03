import ExtraIntroduce from "~/pages/Homepage/ExtraIntroduce/ExtraIntroduce";
import Heading from "~/pages/Homepage/Heading/Heading";
import Introduce from "~/pages/Homepage/Introduce/Introduce";
import Popular from "~/pages/Homepage/Popular/Popular";

const Homepage = () => {
  return (
    <div className="px-24 py-16 mb-8">
      <section className="flex justify-between gap-5">
        <Heading />
      </section>

      <section className="mt-24 w-full">
        <Popular />
        <div className="h-12" />
        <Introduce title="Phòng có sân vườn" />
        <div className="h-12" />
        <Introduce title="Phòng có bếp" />
        <div className="h-12" />
        <Introduce title="Phòng có phòng khách" />
      </section>

      <section className="mt-24">
        <ExtraIntroduce />
      </section>
    </div>
  );
};

export default Homepage;
