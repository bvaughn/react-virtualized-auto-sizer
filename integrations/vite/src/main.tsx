import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { Home } from "./routes/Home";
import { ScrollingDomState } from "./routes/ScrollingDomState";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scrolling-dom-state" element={<ScrollingDomState />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
