import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="min-h-[60vh] pb-10 pt-20">
          <Outlet> </Outlet>
        </div>
      </div>
      <Footer />
    </>
  );
}
