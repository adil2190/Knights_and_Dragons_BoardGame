import React, { useEffect, useState } from "react";

import { getLeaderboard } from "../services/gameService";

function LeaderBoard(props) {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoader(true);
      const res = await getLeaderboard();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  return <div>Leader Board</div>;
}

export default LeaderBoard;
