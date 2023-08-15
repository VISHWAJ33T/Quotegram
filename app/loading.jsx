import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full flex-center">
      {/* <h1 className="text-xl">Loading...</h1> */}
      <Image
        src="assets/icons/loader.svg"
        width={50}
        height={50}
        alt="loading..."
        className="object-contain"
      />
    </div>
  );
};

export default Loading;
