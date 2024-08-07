"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CalculateArea from "@/components/CalculateArea";

export default function Home() {
  const [rowNumber, setRowNumber] = useState<number | string>("");
  const [colNumber, setColNumber] = useState<number | string>("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);

    if (value === "" || (!isNaN(numberValue) && Number.isInteger(numberValue))) {
      setRowNumber(value);
    } else {
      console.log("Invalid row number.");
    }
  };

  const handleColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);

    if (value === "" || (!isNaN(numberValue) && Number.isInteger(numberValue))) {
      setColNumber(value);
    } else {
      console.log("Invalid column number.");
    }
  };

  return (
    <div className="bg-blue-200 w-screen h-screen -z-[999] flex  flex-col">
      <div className="flex justify-center gap-8 items-center h-[3rem] w-full mt-8">
        <TextField
          id="outlined-row"
          label="Enter row number"
          variant="outlined"
          onChange={handleRowChange}
          value={rowNumber}
        />
        <TextField
          id="outlined-col"
          label="Enter column number"
          variant="outlined"
          onChange={handleColChange}
          value={colNumber}
        />
        <Button variant="contained" onClick={handleButtonClick}>
          Submit
        </Button>
      </div>
      {buttonClicked && (
        <CalculateArea
          row={Number(rowNumber)}
          col={Number(colNumber)}
        />
      )}
    </div>
  );
}
