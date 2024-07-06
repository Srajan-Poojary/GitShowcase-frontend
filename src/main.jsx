import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import Landing from "./pages/Landing.jsx";
import Editor from "./pages/Editor.jsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <Notifications zIndex={10000} />

    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </MantineProvider>
);
