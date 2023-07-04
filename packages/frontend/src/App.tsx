// React & 3rd Party Imports
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import { Navbar } from "./components";

// Types
import { View } from "./index";

function App() {
  // Load Views
  const Admin = lazy(() => import("./views/Admin"));
  const Input = lazy(() => import("./views/Input"));
  const List = lazy(() => import("./views/List"));
  const Month = lazy(() => import("./views/Month"));
  const Week = lazy(() => import("./views/Week"));

  // Views Object passed to NavBar
  const views: View[] = [
    {
      title: "Event List",
      url: "/",
      component: <List />,
      align: "left",
    },
    {
      title: "Month View",
      url: "/month",
      component: <Month />,
      align: "left",
    },
    {
      title: "Week View",
      url: "/week",
      component: <Week />,
      align: "left",
    },
    {
      title: " Event Input",
      url: "/input",
      component: <Input />,
      align: "right",
    },
    {
      title: "Admin",
      url: "/admin",
      component: <Admin />,
      align: "right",
    },
  ];

  return (
    <BrowserRouter>
      <Navbar icon="favicon.ico" views={views} />
      <Suspense>
        <Routes>
          {views.map((view: View) => {
            return (
              <Route
                key={view.title}
                path={view.url}
                element={view.component}
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
