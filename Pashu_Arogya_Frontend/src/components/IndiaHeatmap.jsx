import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import INDIA_TOPO_JSON from "../india.topo.json"; // Loads the TopoJSON file
import axios from "axios";

// NOTE: This assumes your backend is running on port 3000 as per your previous code.

const PROJECTION_CONFIG = { scale: 350, center: [78.9629, 22.5937] };
const DEFAULT_COLOR = "#f2f2f2"; // Light Gray/White for default
const colorScale = scaleLinear().domain([0, 100]).range(["#b8d6f9", "#d73027"]);

// Helper function to get the current data endpoint
const getApiUrl = (regionId) => {
  // 🛑 CRITICAL FIX: Base URL must be the port of the running Express app (8000), not 5000.
  // const BASE_URL = "http://localhost:8000"; 
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  return regionId === "All"
    ? `${BASE_URL}/states`
    : `${BASE_URL}/state/${regionId}`;
};

function IndiaHeatmap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [data, setData] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from local Express server
  const fetchData = async (stateId) => {
    try {
      const url = getApiUrl(stateId);
      // Use the correct port 8000 (where the proxy is mounted via src/app.js)
      const response = await axios.get(url);

      const result = response.data;
      const parsed = Array.isArray(result) ? result : (result ? [result] : []);

      setData(parsed);
      setLoading(false);

      if (stateId === "All" && statesList.length === 0) {
        setStatesList(parsed.map(item => ({ id: item.id, state: item.state })));
      }
    } catch (error) {
      // Log the error response details
      console.error("Error fetching map data:", error.message, error.response?.status);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedState);
  }, [selectedState]);


  // Tooltip handlers
  const onMouseEnter = (geo, current) => () => {
    const value = current ? current.value : "N/A";
    setTooltipContent(`${geo.properties.name} - Risk Score: ${value}`);
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  if (loading) return <div className="text-center p-10">Loading map data...</div>;


  return (
    <div className="relative h-full">
      {/* State Selector for the Map Component */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="text-gray-700 font-medium">Select Region:</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border rounded-md text-sm p-2"
        >
          <option value="All">All India</option>
          {Array.isArray(statesList) &&
            statesList.map((d) => (
              <option key={d.id} value={d.id}>
                {d.state}
              </option>
            ))}
        </select>
        <span className="text-sm text-gray-500">Current View: {data.length} region(s)</span>
      </div>

      {/* Composable Map */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        width={800}
        height={600}
        className="w-full h-full"
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find((s) => s.id === geo.id);

              // If specific state selected, zoom onto it. Skip others for zoomed view
              if (selectedState !== "All" && current?.id !== selectedState) return null;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={{
                    default: { outline: "none", stroke: "#999", strokeWidth: 0.5 },
                    hover: { outline: "none", fill: "#ff8c7a", cursor: "pointer" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip Display */}
      {tooltipContent && (
        <div className="absolute bottom-4 left-4 bg-gray-800 text-white p-2 rounded-md text-sm shadow-xl">
          {tooltipContent}
        </div>
      )}
    </div>
  );
}

export default IndiaHeatmap;