import Navbar from "./containers/generic/Navbar";
import useTheme from "./customHooks/useTheme";
import Landing from "./pages/Landing";
import "./App.css";
import { Route, Routes } from "react-router";
import Editor from "./pages/Editor";

function App() {
  useTheme();
  return (
    <>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route index path="/editor" element={<Editor />} />
      </Routes>
    </>
  );
}

export default App;
