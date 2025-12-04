import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import BrowsePage from "./pages/Browse";
import BookshelfPage from "./pages/Bookshelf";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import RootLayout from "./pages/Root";
import "bootstrap/dist/css/bootstrap.min.css";
import BookDetails, { bookDetailLoader } from "./pages/BookDetails";
import NewsPage from "./pages/News";
import ArticlePage, { articleDetailLoader } from "./pages/Article";
import NewsRootLayout from "./pages/NewsRootLayout";
import { articlesLoader } from "./pages/News";
import { action as authAction } from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import WelcomePage from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/browse", element: <BrowsePage /> },
      {
        path: "/news",
        element: <NewsRootLayout />,
        children: [
          { index: true, element: <NewsPage />, loader: articlesLoader },
          {
            path: ":articleId",
            element: <ArticlePage />,
            loader: articleDetailLoader,
          },
        ],
      },
      { path: "/bookshelf", element: <BookshelfPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage />, action: authAction },
      { path: "/:bookId", element: <BookDetails />, loader: bookDetailLoader },
      { path: "/welcome", element: <WelcomePage /> },
    ],
  },
]);
function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
