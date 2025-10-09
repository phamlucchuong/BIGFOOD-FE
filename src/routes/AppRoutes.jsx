
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";


export default function AppRoutes() {
  return (
    <Routes>
      {
        publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout;

          if (Layout) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          }

          // Không có layout thì render trực tiếp
          return <Route key={index} path={route.path} element={<Page />} />;
        })
      }
    </Routes>
  );
}
