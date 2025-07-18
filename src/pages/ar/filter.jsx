import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ArFilters = () => {
  const [filters, setFilters] = useState({
    title: "Evening",
    artist: "Maluk",
    year: "2000",
    country: "Ukraine",
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const filterOptions = {
    title: ["Evening", "Morning", "Afternoon", "Night", "Sunset", "Dawn"],
    artist: ["Maluk", "Picasso", "Van Gogh", "Monet", "Dali", "Rembrandt"],
    year: ["2000", "1999", "1998", "1997", "1996", "1995"],
    country: ["Ukraine", "France", "Netherlands", "Spain", "Italy", "Germany"],
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setOpenDropdown(null);
  };

  const handleClearAll = () => {
    setFilters({
      title: "",
      artist: "",
      year: "",
      country: "",
    });
  };

  const toggleDropdown = (filterType) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear all
        </button>
      </div>

      <div className="filter-group">
        <label className="filter-label">PAINTING'S TITLE</label>
        <div className="dropdown-container">
          <button
            className="dropdown-button"
            onClick={() => toggleDropdown("title")}
          >
            <span className={filters.title ? "selected" : "placeholder"}>
              {filters.title || "Select title"}
            </span>
            <ChevronDown
              className={`dropdown-icon ${
                openDropdown === "title" ? "rotated" : ""
              }`}
            />
          </button>
          {openDropdown === "title" && (
            <div className="dropdown-menu">
              {filterOptions.title.map((option) => (
                <div
                  key={option}
                  className="dropdown-option"
                  onClick={() => handleFilterChange("title", option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">ARTIST NAME</label>
        <div className="dropdown-container">
          <button
            className="dropdown-button"
            onClick={() => toggleDropdown("artist")}
          >
            <span className={filters.artist ? "selected" : "placeholder"}>
              {filters.artist || "Select artist"}
            </span>
            <ChevronDown
              className={`dropdown-icon ${
                openDropdown === "artist" ? "rotated" : ""
              }`}
            />
          </button>
          {openDropdown === "artist" && (
            <div className="dropdown-menu">
              {filterOptions.artist.map((option) => (
                <div
                  key={option}
                  className="dropdown-option"
                  onClick={() => handleFilterChange("artist", option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">YEAR OF CREATION</label>
        <div className="dropdown-container">
          <button
            className="dropdown-button"
            onClick={() => toggleDropdown("year")}
          >
            <span className={filters.year ? "selected" : "placeholder"}>
              {filters.year || "Select year"}
            </span>
            <ChevronDown
              className={`dropdown-icon ${
                openDropdown === "year" ? "rotated" : ""
              }`}
            />
          </button>
          {openDropdown === "year" && (
            <div className="dropdown-menu">
              {filterOptions.year.map((option) => (
                <div
                  key={option}
                  className="dropdown-option"
                  onClick={() => handleFilterChange("year", option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">COUNTRY OF ORIGIN</label>
        <div className="dropdown-container">
          <button
            className="dropdown-button"
            onClick={() => toggleDropdown("country")}
          >
            <span className={filters.country ? "selected" : "placeholder"}>
              {filters.country || "Select country"}
            </span>
            <ChevronDown
              className={`dropdown-icon ${
                openDropdown === "country" ? "rotated" : ""
              }`}
            />
          </button>
          {openDropdown === "country" && (
            <div className="dropdown-menu">
              {filterOptions.country.map((option) => (
                <div
                  key={option}
                  className="dropdown-option"
                  onClick={() => handleFilterChange("country", option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .filters-container {
          border: 1px solid #333;
          border-radius: 8px;
          padding: 24px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .filters-title {
          color: #ffffff;
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }

        .clear-all-btn {
          background: none;
          border: none;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          transition: opacity 0.2s;
        }

        .clear-all-btn:hover {
          opacity: 0.8;
        }

        .filter-group {
          margin-bottom: 20px;
          position: relative;
        }

        .filter-label {
          display: block;
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .dropdown-container {
          position: relative;
        }

        .dropdown-button {
          width: 100%;
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .dropdown-button:hover {
          border-color: #999;
        }

        .dropdown-button:focus {
          outline: none;
          border-color: #007bff;
        }

        .selected {
          color: #000000;
          font-weight: 500;
        }

        .placeholder {
          color: #666;
        }

        .dropdown-icon {
          width: 16px;
          height: 16px;
          color: #666;
          transition: transform 0.2s;
        }

        .dropdown-icon.rotated {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          margin-top: 4px;
          max-height: 200px;
          overflow-y: auto;
        }

        .dropdown-option {
          padding: 12px 16px;
          cursor: pointer;
          font-size: 14px;
          color: #000000;
          transition: background-color 0.2s;
        }

        .dropdown-option:hover {
          background-color: #f5f5f5;
        }

        .dropdown-option:first-child {
          border-radius: 8px 8px 0 0;
        }

        .dropdown-option:last-child {
          border-radius: 0 0 8px 8px;
        }
      `}</style>
    </div>
  );
};

export default ArFilters;
