import React, { useState } from "react";
import Employees from "./Data";
import "./Table.css";

const Table = () => {
  const [generalSearch, setGeneralSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    id: "",
  });
  const [sortData, setSortData] = useState("ASC");
  const [filteredRows, setFilteredRows] = useState(Employees);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnWidths, setColumnWidths] = useState({
    id: 100,
    first_name: 150,
    last_name: 150,
    email: 200,
    gender: 100,
  });

  const itemsPerPage = 20;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredRows.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);

  const sorting = (col) => {
    const sortOrder = sortData === "ASC" ? 1 : -1;

    const sorted = [...filteredRows].sort((a, b) => {
      return a[col].toLowerCase() > b[col].toLowerCase()
        ? sortOrder
        : -sortOrder;
    });

    setSortData("ASC");
    setFilteredRows(sorted);
  };

  const handleGeneralSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setGeneralSearch(searchTerm);

    const sortedAndFiltered = Employees.filter((item) => {
      return (
        searchTerm === "" ||
        item.first_name.toLowerCase().includes(searchTerm) ||
        item.last_name.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm) ||
        item.gender.toLowerCase().includes(searchTerm) ||
        item.id.toString().toLowerCase().includes(searchTerm)
      );
    });

    setFilteredRows(sortedAndFiltered);
    setCurrentPage(1);
  };

  const handleColumnSearch = (event, col) => {
    const searchTerm = event.target.value.toLowerCase();
    setColumnSearch({
      ...columnSearch,
      [col]: searchTerm,
    });

    const sortedAndFiltered = Employees.filter((item) => {
      return (
        columnSearch[col] === "" ||
        item[col].toLowerCase().includes(columnSearch[col])
      );
    });

    setFilteredRows(sortedAndFiltered);
    setCurrentPage(1);
  };

  const [columnVisibility, setColumnVisibility] = useState({
    id: true,
    first_name: true,
    last_name: true,
    email: true,
    gender: true,
  });

  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column],
    }));
  };

  const handleColumnResizeStart = (e, column) => {
    const initialX = e.clientX;
    const initialWidth = columnWidths[column];

    const handleMouseMove = (e) => {
      const newWidth = initialWidth + (e.clientX - initialX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [column]: newWidth < 50 ? 50 : newWidth,
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
    <div className="toggle mt-3">
      <button onClick={() => toggleColumnVisibility("id")} className="btn btn-warning">Hide / Display ID</button>
      <button onClick={() => toggleColumnVisibility("first_name")} className="btn btn-success">Hide / Display First Name</button>
      <button onClick={() => toggleColumnVisibility("last_name")} className="btn btn-primary">Hide / Dispaly Second Name</button>
      <button onClick={() => toggleColumnVisibility("email")} className="btn btn-secondary">Hide / Display Email</button>
      <button onClick={() => toggleColumnVisibility("gender")} className="btn btn-danger">Hide / Display Gender</button>
      </div>

      <form className="ml-5">
        <div className="row ml-5 mt-2">
          <div className="col-md-7">
            <div className="form-group">
              <input type="text" name="" id="" placeholder="Search The Table Data" className="form-control" onChange={handleGeneralSearch} />
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-10">
      <table className="table table-hover table-bordered">
        <thead className="bg-primary">
          <tr>
            <th style={{ width: columnWidths.id, display: columnVisibility.id ? "table-cell" : "none", }}>
              ID{" "}
              <i className="fa-solid fa-sort" onClick={() => sorting("id")}></i>
              <span className="resizable-handle" onDrag={(e) => handleColumnResizeStart(e, "id")}></span>
            </th>
            <th style={{ width: columnWidths.first_name, display: columnVisibility.first_name ? "table-cell" : "none", }}>
              FIRST NAME{" "}
              <i className="fa-solid fa-sort" onClick={() => sorting("first_name")}></i>
              <input type="text" placeholder="Search" onChange={(e) => handleColumnSearch(e, "first_name")} />
              <span className="resizable-handle" onDrag={(e) => handleColumnResizeStart(e, "first_name")}></span>
            </th>

            <th style={{ width: columnWidths.last_name, display: columnVisibility.last_name ? "table-cell" : "none", }}>
              LAST NAME{" "}
              <i className="fa-solid fa-sort" onClick={() => sorting("last_name")}></i>
              <input type="text" placeholder="Search" onChange={(e) => handleColumnSearch(e, "last_name")} />
              <span className="resizable-handle" onDrag={(e) => handleColumnResizeStart(e, "last_name")}></span>
            </th>
            <th style={{ width: columnWidths.email, display: columnVisibility.email ? "table-cell" : "none", }}>
              EMAIL ID{" "}
              <i className="fa-solid fa-sort" onClick={() => sorting("email")}> </i>
              <input type="text" placeholder="Search" onChange={(e) => handleColumnSearch(e, "email")} />
              <span className="resizable-handle" onDrag={(e) => handleColumnResizeStart(e, "email")}></span>
            </th>
            <th>
              GENDER{" "}
              <i className="fa-solid fa-sort" onClick={() => sorting("gender")}></i>
              <input type="text" placeholder="Search" onChange={(e) => handleColumnSearch(e, "gender")} />
              <span className="resizable-handle" onDrag={(e) => handleColumnResizeStart(e, "gender")}></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ display: columnVisibility.id ? "table-cell" : "none" }}>{item.id}</td>
              <td style={{ display: columnVisibility.first_name ? "table-cell" : "none" }}>{item.first_name}</td>
              <td style={{ display: columnVisibility.last_name ? "table-cell" : "none" }}>{item.last_name}</td>
              <td style={{ display: columnVisibility.email ? "table-cell" : "none" }}>{item.email}</td>
              <td style={{ display: columnVisibility.gender ? "table-cell" : "none" }}>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      <hr className="hr" />
      <div className="page">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="btn btn-success ">
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-success">
          Next
        </button>
      </div>

    </>)
}
export default Table