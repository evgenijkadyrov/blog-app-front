import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, isAuthSelector } from "./redux/slicers/auth";
import { useEffect } from "react";

const App = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector)
    useEffect(() => {
      dispatch(fetchAuthMe());
    }, [])

    return (<>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="posts/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Container>
      ;
    </>
  )
  }
;

export default App;
