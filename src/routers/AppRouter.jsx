import { Routes, Route } from "react-router-dom";
import { Layout } from '../pages/Layout/Layout';
import { Home } from "../components/pages/Home/Home";
import { SignIn } from "../components/pages/SignIn/SignIn";
import { SignUp } from "../components/pages/SignUp/SignUp";
import { Portfolio } from "../components/pages/Portfolio/Portfolio";
import { PrivateRoute } from "../components/api/PrivateRoute";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="portfolio" element={
        <PrivateRoute>
          <Portfolio />
        </PrivateRoute>
      } />
    </Route>
  </Routes>
);
