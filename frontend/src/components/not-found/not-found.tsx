import Empty from "@/assets/empty.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center py-10 items-center w-96">
      <img src={Empty} alt="Empty Image" className="w-full" />
      <p className="text-xl font-medium text-gray-500">No Data Found</p>
    </div>
  );
};

export default NotFound;
