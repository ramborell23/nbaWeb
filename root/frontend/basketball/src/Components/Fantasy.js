import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Fantasy() {
    const [data, setData] = useState([]);

      useEffect(() => {
        async function fetchData() {
          const response = await axios
            .get("http://localhost:8100/scrape")
            .catch((error) => console.error(error));
            console.log(response)
        //   setData(response.data.players2020);
        }
        fetchData();
      }, []);
    return (
        <div>
            Fantasy
        </div>
    );
}
