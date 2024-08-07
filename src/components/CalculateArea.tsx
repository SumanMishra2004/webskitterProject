import React, { useState, useEffect } from 'react';

interface CalculateMatrixProps {
  row: number;
  col: number;
}

const CalculateArea: React.FC<CalculateMatrixProps> = ({ row, col }) => {
  // Initialize matrices with state
  const [sumMatrix, setSumMatrix] = useState<number[][]>(
    Array.from({ length: row }, () => Array(col).fill(0))
  );
  const [productMatrix, setProductMatrix] = useState<number[][]>(
    Array.from({ length: row }, () => Array(col).fill(0))
  );
  const [totalMatrix, setTotalMatrix] = useState<number[][]>(
    Array.from({ length: row }, () => Array(col).fill(0))
  );
  const [subMatrix, setSubMatrix] = useState<number[][]>(
    Array.from({ length: row }, () => Array(col).fill(0))
  );
  const [multMatrix, setMultMatrix] = useState<number[][]>(
    Array.from({ length: row }, () => Array(col).fill(0))
  );
  const [showTotalMatrix, setShowTotalMatrix] = useState(false); // State to manage visibility of total matrix
  const [showSubMatrix, setShowSubMatrix] = useState(false); // State to manage visibility of sub matrix
  const [showMultMatrix, setShowMultMatrix] = useState(false); // State to manage visibility of multiplication matrix

  // Function to update matrices
  const updateMatrices = (newSumMatrix: number[][]) => {
    setSumMatrix(newSumMatrix);
    const newProductMatrix = newSumMatrix.map((r, i) =>
      r.map((val, j) => i * j)
    );
    setProductMatrix(newProductMatrix);
    addTwoMatrix(newSumMatrix, newProductMatrix);
    subTwoMatrix(newSumMatrix, newProductMatrix);
    multiplyMatrices(newSumMatrix, newProductMatrix);
  };

  // Fill the matrices initially
  useEffect(() => {
    const initialSumMatrix = Array.from({ length: row }, (_, i) =>
      Array.from({ length: col }, (_, j) => i + j)
    );
    const initialProductMatrix = Array.from({ length: row }, (_, i) =>
      Array.from({ length: col }, (_, j) => i * j)
    );

    setSumMatrix(initialSumMatrix);
    setProductMatrix(initialProductMatrix);
    addTwoMatrix(initialSumMatrix, initialProductMatrix);
    subTwoMatrix(initialSumMatrix, initialProductMatrix);
    multiplyMatrices(initialSumMatrix, initialProductMatrix);
  }, [row, col]);

  // Handle input changes
  const handleSumChange = (rowIndex: number, colIndex: number, value: string) => {
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      const updatedSumMatrix = sumMatrix.map((r, i) =>
        r.map((val, j) => (i === rowIndex && j === colIndex ? numberValue : val))
      );

      updateMatrices(updatedSumMatrix);
    }
  };

  // Function to add two matrices
  const addTwoMatrix = (sumMatrix: number[][], productMatrix: number[][]) => {
    const newTotalMatrix = sumMatrix.map((rowArr, rowIndex) =>
      rowArr.map((value, colIndex) => value + productMatrix[rowIndex][colIndex])
    );
    setTotalMatrix(newTotalMatrix);
  };

  // Function to subtract two matrices
  const subTwoMatrix = (sumMatrix: number[][], productMatrix: number[][]) => {
    const newSubMatrix = sumMatrix.map((rowArr, rowIndex) =>
      rowArr.map((value, colIndex) => value - productMatrix[rowIndex][colIndex])
    );
    setSubMatrix(newSubMatrix);
  };

  // Function to multiply two matrices
  const multiplyMatrices = (sumMatrix: number[][], productMatrix: number[][]) => {
    const newMultMatrix = sumMatrix.map((rowArr, rowIndex) =>
      rowArr.map((value, colIndex) => value * productMatrix[rowIndex][colIndex])
    );
    setMultMatrix(newMultMatrix);
  };

  // Handle button click to show the total matrix
  const handleShowTotalMatrix = () => {
    setShowTotalMatrix(true);
  };

  // Handle button click to show the subtracted matrix
  const handleShowSubMatrix = () => {
    setShowSubMatrix(true);
  };

  // Handle button click to show the multiplied matrix
  const handleShowMultMatrix = () => {
    setShowMultMatrix(true);
  };

  return (
    <div>
      <h1>Calculated Area</h1>
      <p>Row Number: {row}</p>
      <p>Column Number: {col}</p>
      <div className='w-auto h-auto bg-slate-600 text-white flex justify-around items-center flex-wrap pb-10'>
        <div>
          <h2>Sum Matrix</h2>
          <table>
            <tbody>
              {sumMatrix.map((rowArr, rowIndex) => (
                <tr key={`sum-row-${rowIndex}`}>
                  {rowArr.map((value, colIndex) => (
                    <td key={`sum-col-${colIndex}`} className='p-[15px] border-white border-solid border-[1px]'>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleSumChange(rowIndex, colIndex, e.target.value)}
                        style={{ width: '60px', textAlign: 'center', backgroundColor: 'transparent', border: 'none' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Product Matrix</h2>
          <table>
            <tbody>
              {productMatrix.map((rowArr, rowIndex) => (
                <tr key={`product-row-${rowIndex}`}>
                  {rowArr.map((value, colIndex) => (
                    <td key={`product-col-${colIndex}`} className='p-[15px] border-white border-solid border-[1px]'>
                      <input
                        type="number"
                        value={value}
                        readOnly
                        style={{ width: '60px', textAlign: 'center', backgroundColor: 'transparent', border: 'none' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleShowTotalMatrix}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Add Matrix
        </button>
        <button
          onClick={handleShowSubMatrix}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Subtract Matrix
        </button>
        <button
          onClick={handleShowMultMatrix}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Multiply Matrix
        </button>
        {showTotalMatrix && (
          <div>
            <h2>Total Matrix (Sum + Product)</h2>
            <table>
              <tbody>
                {totalMatrix.map((rowArr, rowIndex) => (
                  <tr key={`total-row-${rowIndex}`}>
                    {rowArr.map((value, colIndex) => (
                      <td key={`total-col-${colIndex}`} className='p-[15px] border-white border-solid border-[1px]'>
                        <input
                          type="number"
                          value={value}
                          readOnly
                          style={{ width: '60px', textAlign: 'center', backgroundColor: 'transparent', border: 'none' }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showSubMatrix && (
          <div>
            <h2>Subtracted Matrix (Sum - Product)</h2>
            <table>
              <tbody>
                {subMatrix.map((rowArr, rowIndex) => (
                  <tr key={`sub-row-${rowIndex}`}>
                    {rowArr.map((value, colIndex) => (
                      <td key={`sub-col-${colIndex}`} className='p-[15px] border-white border-solid border-[1px]'>
                        <input
                          type="number"
                          value={value}
                          readOnly
                          style={{ width: '60px', textAlign: 'center', backgroundColor: 'transparent', border: 'none' }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showMultMatrix && (
          <div>
            <h2>Multiplied Matrix (Sum * Product)</h2>
            <table>
              <tbody>
                {multMatrix.map((rowArr, rowIndex) => (
                  <tr key={`mult-row-${rowIndex}`}>
                    {rowArr.map((value, colIndex) => (
                      <td key={`mult-col-${colIndex}`} className='p-[15px] border-white border-solid border-[1px]'>
                        <input
                          type="number"
                          value={value}
                          readOnly
                          style={{ width: '60px', textAlign: 'center', backgroundColor: 'transparent', border: 'none' }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculateArea;
