import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./App.css";
import NotiSidebar from "./components/Sidebar/NotiSidebar";
import ProjectListTable from "./containers/ProjectList/ProjectList";
import ProjectDetail from "./components/Project/ProjectDetail/ProjectDetail";
import Home from "./containers/Home/Home";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import TargetListTable from "./containers/TargetList/TargetList";
import MessageListTable from "./containers/MessageList/MessageList";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import HistoryTable from "./containers/History/HistoryTable";
import {EmailForm} from "./components/Email/Email";
import OAuth from "./components/OAuth";

export const SidebarLayout = () => (
  <>
    <div className="sidebar" style={{ height: "100vh" }}>
      <NotiSidebar />
    </div>
    <div className="contents">
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<SidebarLayout />}>
          <Route
            path="/home"
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <AuthRoute>
                <ProjectListTable />
              </AuthRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <AuthRoute>
                <ProjectDetail />
              </AuthRoute>
            }
          />
          <Route
            path="/targets"
            element={
              <AuthRoute>
                <TargetListTable />
              </AuthRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <AuthRoute>
                <MessageListTable />
              </AuthRoute>
            }
          />
          <Route
            path="/history"
            element={
              <AuthRoute>
                <HistoryTable />
              </AuthRoute>
            }
          />
          <Route
            path="/email"
            element={
              <AuthRoute>
                <EmailForm />
              </AuthRoute>
            }
            />
          <Route
            path="/oauth-callback"
            element={
              <AuthRoute>
                <OAuth/>
              </AuthRoute>
            }
            />
        </Route>
        <Route path="*" element={<Navigate replace to={"/home"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
