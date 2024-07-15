import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import ChatList from "./components/ChatList";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="md:flex min-h-screen bg-[#1C2732]">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {!isMobile && (
          <ChatList sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="md:flex-1">
          <Routes>
            {!isMobile && <Route path="/" element={<Home />} />}
            {isMobile && (
              <Route
                path="/"
                element={
                  <ChatList
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                }
              />
            )}
            <Route path="/chat/:id" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
