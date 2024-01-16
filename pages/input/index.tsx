import React from "react";
import list from "../../constants/list";
const index = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className=" shadow-md p-10 rounded-xl">
        <h1 className="text-xl font-semibold text-gray-500 pb-6 underline">
          Inputs
        </h1>
        {list.map((item) => (
          <h1 className="font-base py-2 ">{item}</h1>
        ))}
      </div>
    </div>
  );
};

export default index;
