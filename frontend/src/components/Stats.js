import React, { useState, useEffect } from "react";
import "../App.css";

function Stats() {
  const [stats, setStats] = useState({ ContactNum: 0, PhoneNum: 0, newContact: "", oldContact: "" });

  // Function to fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.error("Failed to fetch stats");
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Fetch stats when the component mounts
  fetchStats();

  return (
    <div className="stats">
      <h2 className="stats-heading">Statistics</h2>
      <table className="stats-table">
        <tbody>
          <StatRow label="Total Contacts" value={stats.ContactNum} />
          <StatRow label="Total Phones" value={stats.PhoneNum} />
          <StatRow label="Newest Contact Timestamp" value={stats.newContact} />
          <StatRow label="Oldest Contact Timestamp" value={stats.oldContact} />
        </tbody>
      </table>
      <button type="button" onClick={fetchStats} className="refresh-stats">
        Refresh Stats
      </button>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <tr className="stats-row">
      <td>{label}:</td>
      <td>{value}</td>
    </tr>
  );
}

export { Stats };
