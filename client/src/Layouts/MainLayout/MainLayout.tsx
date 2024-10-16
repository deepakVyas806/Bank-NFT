import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import TabsFooter from "../../Components/TabsFooter/TabsFooter";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <TabsFooter />
    </div>
  );
};

export default MainLayout;
