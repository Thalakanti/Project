// import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/users/Users";
import CreateUser from "./pages/auth/CreateUser";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar/navbar";
import ProductList from "./pages/Products/ProductList";
import ProductItem from "./pages/Products/ProductItem";
import CreateOrder from "./pages/Orders/CreateOrder";
import OrderItem from "./pages/Orders/OrderItem";
import PurchaseOrder from "./pages/Orders/PurchaseOrder";
import OrderList from "./pages/Orders/OrderList"
import Dashboard from "./pages/InveDashboard/Dashboard";
import ProductById from "./pages/InveDashboard/ProductById";
import SupplierList from "./pages/Suppliers/SuppliersList";
import CreateSupplier from "./pages/Suppliers/CreateSupplier";
import ProdcutSupplier from "./pages/Suppliers/ProductSupplier"
import ReportAnalytics from "./pages/R&A/ReportAnalytics";

function App() {
  return (
    <div className="App">
      Hello world
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Users" element={<Users />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/LoginUser" element={<Login />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/ProductItem" element={<ProductItem />} />
          <Route path="/ProductById" element={<ProductById/>}/>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Orders" element={<OrderList />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/CreateOrder" element={<CreateOrder />} />
          <Route path="/OrderItem" element={<OrderItem />} />
          <Route path="/PurchaseOrder" element={<PurchaseOrder />} />
          <Route path="/SuppliersList" element={<SupplierList/>}/>
          <Route path="/Create_Supplier" element={<CreateSupplier/>}/>
          <Route path="Product_Supplier" element={<ProdcutSupplier/>}/>
          <Route path="/R&A" element={<ReportAnalytics/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
