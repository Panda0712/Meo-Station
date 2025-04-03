import CardPopular from "~/pages/Homepage/Popular/CardPopular";
import { capitalizeWords } from "~/utils/formatters";

const Popular = () => {
  return (
    <>
      <h3 className="text-[24px] text-[#152C5B] font-semibold mb-8 z-10">
        {capitalizeWords("Lựa chọn nhiều nhất")}
      </h3>
      <div className="flex gap-6">
        <div className="relative basis-[calc(30%-12px)]">
          <CardPopular expand />
        </div>
        <div className="relative flex flex-shrink-0 flex-wrap basis-[calc(70%-12px)] gap-6">
          <CardPopular childCard />
          <CardPopular childCard />
          <CardPopular childCard />
          <CardPopular childCard />
        </div>
      </div>
    </>
  );
};

export default Popular;
