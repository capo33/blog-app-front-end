import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Users/Profile";
import Register from "./pages/Auth/Register";
import Header from "./components/Header/Header";
import CreateBlog from "./pages/Blog/CreateBlog";
import UpdateBlog from "./pages/Blog/UpdateBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import Categories from "./pages/Categories/Categories";
import UpdateProfile from "./pages/Users/UpdateProfile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import CreateCategory from "./pages/Categories/CreateCategory";
import UpdateCategory from "./pages/Categories/UpdateCategory";

import "./App.css";

function App() {
  const auth = useSelector((state) => state.auth);
  const token = auth?.user?.token;

  return (
    <div className='container px-5 py-10 mx-auto'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/profile' element={<Profile />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<UpdateCategory />} />
        <Route path='/create-category' element={<CreateCategory />} />
        <Route path='/blog-details/:id' element={<BlogDetails />} />
        <Route
          path='/create'
          element={token ? <CreateBlog /> : <Navigate to='/login' />}
        />
        <Route
          path='/profile'
          element={token ? <Profile /> : <Navigate to='/login' />}
        />

        {/* <Route
          path='/blog-details/:id'
          element={token ? <BlogDetails /> : <Navigate to='/login' />}
        /> */}

        <Route
          path='/update-blog/:id'
          element={token ? <UpdateBlog /> : <Navigate to='/login' />}
        />
        <Route
          path='/update-profile/:id'
          element={token ? <UpdateProfile /> : <Navigate to='/login' />}
        />
      </Routes>
    </div>
  );
}

export default App;
