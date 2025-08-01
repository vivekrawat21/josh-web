import React from "react";

export default function VisitorCounter() {
  return (
   <div style={{
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#040604",
  borderRadius: "20px",
  padding: "20px",
  height: "40px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  zIndex: 9999,
  fontSize: "100px"
}}> 
      <img
        src="https://hitwebcounter.com/counter/counter.php?page=21215010&style=0036&nbdigits=6&type=page&initCount=0" title="Counter Widget"
        alt="Visitor Counter" 
      />
    </div>
  );
}