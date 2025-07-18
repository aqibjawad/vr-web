import Home from "../pages/home/Home";
import AR from "../pages/ar/index";
import SimpleModelViewer from "../components/three-js/SimpleModelViewer";

// Wrapper component to add dynamic titles
// const PageWrapper = ({ title, children }) => {
//   return (
//     <>
//       <Helmet>
//         <title>{title}</title>
//       </Helmet>
//       {children}
//     </>
//   );
// };

const routes = [
  {
    path: "/",
    element: <Home />,
    exact: "true",
    type: "public",
  },
  {
    path: "/ar",
    element: <AR />,
    exact: "true",
    type: "public",
  },
  {
    path: "/vr-viewer",
    element: <SimpleModelViewer />,
    exact: "true",
    type: "public",
  },
];

export default routes;
