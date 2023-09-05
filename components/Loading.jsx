import Image from "next/image";
import LoaderSVG from "@public/assets/icons/loader.svg"
const Loading = () => {
  return (
    <div className="w-full flex-center">
      <Image
        src={LoaderSVG}
        width={50}
        height={50}
        alt="loading..."
        className="object-contain"
      />
    </div>
  );
};

export default Loading;
