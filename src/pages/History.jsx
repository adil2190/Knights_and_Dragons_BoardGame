import React, { useState, useEffect } from "react";
import { getHistory } from "../services/gameService";
import { userInfo } from "../configs/details";
function History(props) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoader(true);
      const res = await getHistory(userInfo.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  return <div>History</div>;
}

export default History;
