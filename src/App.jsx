import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        // タスク一覧画面
        path: "/",
        element: (
          <div>
            <h1>タスク一覧</h1>
            <Link to="trash">ゴミ箱へ</Link>
          </div>
        ),
      },
      {
        // ゴミ箱画面
        path: "trash",
        element: (
          <div>
            <h1>ゴミ箱</h1>
            <Link to="/">タスク一覧へ</Link>
          </div>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
