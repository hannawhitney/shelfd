import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import FooterElement from "../components/Footer";

function RootLayout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <MainNavigation />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </main>
      <FooterElement />
    </div>
  );
}

export default RootLayout;
