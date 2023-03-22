import React, { useState } from "react";
import "../App.css";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface TableData {
  column: string;
  rows: any[];
}

const Table = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleColumnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowColumn(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setShowColumn(false);
  };

  const [showColumn, setShowColumn] = React.useState<boolean>(false);
  const [data, setData] = useState<TableData[]>([
    {
      column: "Title /Decription",
      rows: ["Macbooks M1 2022", "Server Units", "64” Screens"],
    },
    {
      column: "Manufacturer",
      rows: ["Any", "Any", "Samsung"],
    },
    {
      column: "Quantity",
      rows: ["1,000", "10", "200"],
    },
  ]);

  const addRow = () => {
    let newData = [...data];
    newData = newData.map((item) => {
      return {
        ...item,
        rows: [...item.rows, ""],
      };
    });
    setData(newData);
    handleClose();
  };

  const addColumn = () => {
    const newData = [...data];
    newData.push({
      column: "",
      rows: newData[0].rows.map((item) => ""),
    });
    setData(newData);
    handleClose();
  };

  const handleInputChange = (
    value: string,
    columnIndex: number,
    rowIndex: number
  ) => {
    const newData = [...data];
    newData[columnIndex].rows[rowIndex] = value;
    setData(newData);
  };

  const handleSubmit = () => {
    console.log("Data: ", data);
  };

  const deleteRow = (rowIndex: number) => {
    setData(data.filter((_, index) => index !== rowIndex));
    handleClose();
  };
  const deleteColumn = (columnIndex: number) => {
    setData(data.filter((_, index) => index !== columnIndex));
    handleClose();
  };

  return (
    <>
      <div className="wrapper">
        <TextField
          label="Currency"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Naira (N)</InputAdornment>
            ),
          }}
        />
        <table>
          <thead>
            <tr>
              {data.map((item, index) => (
                <>
                  <th key={item.column}>
                    <FormControl
                      key={item.column}
                      sx={{ m: 1, width: "25ch", backgroundColor: "#E0E0E0" }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        error={item.column === "Enter Column title"}
                        id="outlined-adornment-weight"
                        // readOnly={column.read}
                        // onChange={(event) => handleOnChange(event)}
                        endAdornment={
                          <InputAdornment position="end">
                            <button onClick={handleColumnClick}>
                              {" "}
                              <img
                                src={require("../assets/Vector.png")}
                                alt=""
                              />
                            </button>
                          </InputAdornment>
                        }
                        startAdornment={
                          <InputAdornment
                            position="start"
                            sx={{
                              // color: column.color,
                              fontSize: 10,
                            }}
                          >
                            {item.column}
                          </InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                      />
                    </FormControl>
                  </th>
                  <>
                    {showColumn && (
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={addColumn}>
                          <div className="flex">
                            <div>
                              <img src={require("../assets/plus.png")} alt="" />
                            </div>{" "}
                            <div className="menu">Add Column</div>
                          </div>
                        </MenuItem>
                        <MenuItem onClick={() => deleteColumn(index)}>
                          <div className="flex">
                            <div>
                              <img
                                src={require("../assets/delete.png")}
                                alt=""
                              />
                            </div>{" "}
                            <div className="menu">Delete Column</div>
                          </div>
                        </MenuItem>
                      </Menu>
                    )}
                  </>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {data[0].rows.map((row, rowIndex) => (
              <>
                <tr key={rowIndex}>
                  {data.map((item, columnIndex) => (
                    <td key={item.column}>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <OutlinedInput
                          readOnly={row.read}
                          error={row.name === "kindly enter a value"}
                          id="outlined-adornment-weight"
                          value={item.rows[rowIndex]}
                          onChange={(e) =>
                            handleInputChange(
                              e.target.value,
                              columnIndex,
                              rowIndex
                            )
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <button onClick={handleRowClick}>
                                {" "}
                                <img
                                  src={require("../assets/Vector.png")}
                                  alt=""
                                />
                              </button>
                            </InputAdornment>
                          }
                          startAdornment={
                            <InputAdornment
                              position="start"
                              sx={{
                                color: row.color,
                                fontSize: 10,
                              }}
                            ></InputAdornment>
                          }
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                        />
                      </FormControl>
                    </td>
                  ))}
                </tr>
                <>
                  {!showColumn && (
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={addRow}>
                        <div className="flex">
                          <div>
                            <img src={require("../assets/plus.png")} alt="" />
                          </div>{" "}
                          <div className="menu">Add Row</div>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div
                          className="flex"
                          onClick={() => deleteRow(rowIndex)}
                        >
                          <div>
                            <img src={require("../assets/delete.png")} alt="" />
                          </div>{" "}
                          <div className="menu">Delete Row</div>
                        </div>
                      </MenuItem>
                    </Menu>
                  )}
                </>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div onClick={addRow} className="addRow">
        <img src={require("../assets/add-icon.png")} alt="" />
      </div>
      <div className="submit">
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};
export default Table;
