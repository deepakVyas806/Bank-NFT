import React from "react";

const NoDataAvailable: React.FC = () => {
  return (
    <div className="h-auto flex flex-col justify-center items-center">
      <div className="w-full h-[calc(100vh-11rem)] border flex flex-col justify-center items-center border-dashed py-4 rounded-md">
        <img src="/no-data-available.svg" alt="No Data" className="w-48 h-48" />
        <p className="text-lg font-medium text-gray-900 text-center mt-2">
          No Data Available
        </p>
      </div>
    </div>
  );
};

export default NoDataAvailable;
