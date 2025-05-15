import { Package } from "lucide-react";

interface BannerPromoInterface {
  data: {
    id: number;
    title: string;
    info: string;
    image: string;
    banner: string;
    textColor: string;
    bgColor: string;
  };
}
const BannerPromo = ({ data }: BannerPromoInterface) => {
  return (
    <div
      className={`p-8 max-h-72 h-64 rounded-3xl inline-flex bg-no-repeat ${
        data.banner ? `bg-[url('${data.banner}')]` : "bg-main-bg"
      } bg-cover`}
    >
      <div className="left-container select-none flex flex-col gap-2 items-start">
        <div
          style={{ background: data.bgColor }}
          className={`inline-flex items-center gap-2   text-sm p-1 px-2 rounded`}
        >
          <Package style={{ color: data.textColor }} size={16} />
          <h6 style={{ color: data.textColor }}>{data.info}</h6>
        </div>
        <h1
          className="font-black text-2xl sm:text-3xl md:text-4xl"
          style={{ color: data.bgColor }}
        >
          {data.title}
        </h1>
      </div>
      <div className="right-container h-full w-full max-h-60 flex items-end justify-end">
        <img
          // width={200}
          // height={200}
          className="h-full aspect-square bg-contain"
          src={data.image}
          alt=""
          draggable={false}
        />
      </div>
    </div>
  );
};

export default BannerPromo;
