// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const ReportAnalytics = () => {
//   const [timeFrame, setTimeFrame] = useState('30days');
//   const [inventoryData, setInventoryData] = useState([]);
//   const [stockValueData, setStockValueData] = useState([]);
//   const [supplierPerformanceData, setSupplierPerformanceData] = useState([]);

//   useEffect(() => {
//     fetchReportData();
//   }, [timeFrame]);

//   const fetchReportData = async () => {
//     try {
//       const inventoryResponse = await axios.get(`/api/reports/inventory?timeFrame=${timeFrame}`);
//       const stockValueResponse = await axios.get(`/api/reports/stock-value?timeFrame=${timeFrame}`);
//       const supplierPerformanceResponse = await axios.get(`/api/reports/supplier-performance?timeFrame=${timeFrame}`);

//       setInventoryData(inventoryResponse.data);
//       setStockValueData(stockValueResponse.data);
//       setSupplierPerformanceData(supplierPerformanceResponse.data);
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     }
//   };

//   return (
//     <div className="reports">
//       <h1>Reports and Analytics</h1>
      
//       <div className="time-frame-selector">
//         <label htmlFor="timeFrame">Select Time Frame:</label>
//         <select id="timeFrame" value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
//           <option value="30days">Last 30 Days</option>
//           <option value="quarter">Last Quarter</option>
//           <option value="year">Last Year</option>
//           <option value="custom">Custom Range</option>
//         </select>
//       </div>
      
//       <div className="report-section">
//         <h2>Inventory Movement</h2>
//         <InventoryReport data={inventoryData} />
//       </div>

//       <div className="report-section">
//         <h2>Stock Value Over Time</h2>
//         <StockValueReport data={stockValueData} />
//       </div>

//       <div className="report-section">
//         <h2>Supplier Performance</h2>
//         <SupplierPerformanceReport data={supplierPerformanceData} />
//       </div>
//     </div>
//   );
// };

// const InventoryReport = ({ data }) => {
//   return (
//     <div className="inventory-report">
//       {data.length === 0 ? (
//         <p>No inventory movement data available for this time frame.</p>
//       ) : (
//         <ul>
//           {data.map((item, index) => (
//             <li key={index}>
//               Product: {item.productName} - {item.movementType} - Quantity: {item.quantity}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const StockValueReport = ({ data }) => {
//   return (
//     <div className="stock-value-report">
//       {data.length === 0 ? (
//         <p>No stock value data available for this time frame.</p>
//       ) : (
//         <ul>
//           {data.map((item, index) => (
//             <li key={index}>
//               Date: {item.date} - Stock Value: ${item.value}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// const SupplierPerformanceReport = ({ data }) => {
//   return (
//     <div className="supplier-performance-report">
//       {data.length === 0 ? (
//         <p>No supplier performance data available for this time frame.</p>
//       ) : (
//         <ul>
//           {data.map((item, index) => (
//             <li key={index}>
//               Supplier: {item.supplierName} - Delivery Time: {item.deliveryTime} days - Fulfillment Rate: {item.fulfillmentRate}%
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ReportAnalytics;
