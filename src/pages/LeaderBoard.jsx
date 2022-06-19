import React, { useEffect, useState } from "react";

import { getLeaderboard } from "../services/gameService";
import { FadeLoader } from "react-spinners";
function LeaderBoard(props) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoader(true);
      const res = await getLeaderboard();
      setData(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h1 className="text-[#f9c802] text-[30px] font-bold text-center">
        Leader Board
      </h1>

      <div className="w-[85%] mx-auto my-[20px]">
        <div className="flex w-full bg-[#fff] py-[10px] rounded-lg">
          <p className="text-[#f9c802] flex-1 font-bold text-center">Rank</p>
          <p className="text-[#f9c802] flex-1 font-bold text-center">Name</p>
          <p className="text-[#f9c802] flex-1 font-bold text-center">
            Duration
          </p>
          <p className="text-[#f9c802] flex-1 font-bold text-center">Date</p>
        </div>
        {loader ? (
          <div className="text-center my-[80px] ">
            <FadeLoader color="#f9c802" />
          </div>
        ) : (
          <>
            {data.map((item, index) => (
              <div
                key={index}
                className="flex w-full  bg-[#fff] py-[10px] my-[8px] rounded-lg"
              >
                <p className="text-[#444] flex-1 text-center font-bold">
                  {index + 1}
                </p>
                <p className="text-[#444] flex-1 text-center font-bold">
                  {item.fullName}
                </p>
                <p className="text-[#444] flex-1 text-center font-bold">
                  {item.time < 60
                    ? `${item.time} seconds`
                    : `${parseFloat(item.time / 60).toFixed(1)} minutes`}
                </p>
                <p className="text-[#444] flex-1 font-bold text-center">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
