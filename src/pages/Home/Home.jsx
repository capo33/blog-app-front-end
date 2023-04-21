import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Main from "./Main";
import Section from "./Section";
import { getUserProfile } from "../../features/auth/authSlice";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.user?.token;

  const dispatch = useDispatch();

  useEffect(() => {
    if(token) {
      dispatch(getUserProfile({ token, toast }));
    }
  }, [dispatch, token]);
  return (
    <>
      <Main />
      <Section />
    </>
  );
};

export default Home;
