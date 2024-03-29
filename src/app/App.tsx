import React, { useEffect } from "react";
import "./App.css";
import { BottomNav, Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Footer } from "../components/Footer/Footer";
import { Profile } from "../components/Profile/Profile";
import { Register } from "../components/Register/Register";
import houses from "../img/houses.png";
import blobs from "../img/blobs.png";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login } from "../components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserData } from "../store/redux/auth-reducer";
import { Border, ProgressBar } from "../components/ProgressBar/ProgressBar";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { AppRootStateType } from "../store/redux/store";
import { RequestStatusType } from "./app-reducer";
import { Posts } from "../components/Posts/Posts";
import { FormStepper } from "../components/Posts/AddPost/Stepper/FormStepper";
import { useSpring, animated } from "react-spring";
import classes from "./clouds.module.css";
import { CertainPostPage } from "../components/CertainPostPage/CertainPostPage";
import { PopUpMailSent } from "../components/Register/PopUpMailSent";

const calc = (x: number, y: number) => [
  x - window.innerWidth / 2,
  y - window.innerHeight / 2,
];
const trans1 = (x: number, y: number) =>
  `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x: number, y: number) =>
  `translate3d(${-1 * (x / 8 + 35)}px,${y / 8 - 230}px,0)`;
const trans3 = (x: number, y: number) =>
  `translate3d(${y / 6 - 250}px,${x / 6 - 200}px,0)`;

function App() {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 3, tension: 1550, friction: 2040 },
  }));

  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  return (
    <>
      <ErrorSnackbar />
      <PopUpMailSent />

      <div className="background">
        <img
          style={{ zIndex: -1 }}
          className={"blobs"}
          src={blobs}
          alt="blobs"
        />
        <img
          style={{ zIndex: -1 }}
          className={"houses"}
          src={houses}
          alt="houses"
        />
        <div
          className={classes.container}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
        >
          <animated.div
            className={classes.card1}
            style={{
              transform: props.xy.interpolate(
                // @ts-ignore
                trans1
              ),
              zIndex: -1,
            }}
          />
          <div className="container">
            <animated.div
              className={classes.card2}
              style={{
                transform: props.xy.interpolate(
                  // @ts-ignore
                  trans2
                ),
                zIndex: -1,
              }}
            />
            <animated.div
              className={classes.card3}
              style={{
                transform: props.xy.interpolate(
                  // @ts-ignore
                  trans3
                ),
                zIndex: -1,
              }}
            />
            <div className="main-wrapper">
              <Border />
              {status === "loading" && <ProgressBar />}
              <Header />
              <div className="main-wrapper-content">
                <Switch>
                  <Route exact path="/">
                    {" "}
                    <Main />{" "}
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/profile">
                    {" "}
                    <Profile />{" "}
                  </Route>
                  <Route path="/register">
                    {" "}
                    <Register />{" "}
                  </Route>
                  <Route path="/posts">
                    {" "}
                    <Posts />{" "}
                  </Route>
                  <Route path="/add">
                    {" "}
                    <FormStepper />{" "}
                  </Route>
                  <Route path={"/post/:id"}>
                    {" "}
                    <CertainPostPage />{" "}
                  </Route>
                  <Redirect to={"/"} />
                </Switch>
              </div>
              <Footer />
              <BottomNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
