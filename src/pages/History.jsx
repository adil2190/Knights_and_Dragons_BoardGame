import React, { useState, useEffect } from "react";
import { getHistory } from "../services/gameService";
import { userInfo } from "../configs/details";
import { FadeLoader } from "react-spinners";

function History(props) {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoader(true);
      const res = await getHistory(userInfo.id);
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
        History
      </h1>

      <div className="w-[85%] mx-auto my-[20px]">
        <div className="flex w-full  bg-[#fff] py-[10px] rounded-lg">
          <p className="text-[#f9c802] text-center flex-1 font-bold">Status</p>
          <p className="text-[#f9c802] text-center flex-1 font-bold">
            Duration
          </p>
          <p className="text-[#f9c802] text-center flex-1 font-bold">Date</p>
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
                className="flex w-full justify-around bg-[#fff] py-[10px] my-[8px] rounded-lg"
              >
                <p
                  className={` ${
                    item.status == "won" ? "text-green-700" : "text-red-700"
                  } text-center flex-1 font-bold`}
                >
                  {item.status}
                </p>
                <p className="text-[#444] text-center flex-1 font-bold">
                  {item.time < 60
                    ? `${item.time} seconds`
                    : `${parseFloat(item.time / 60).toFixed(1)} minutes`}
                </p>
                <p className="text-[#444] text-center flex-1 font-bold">
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

export default History;
