import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { Login } from "../components/Login/Login";
import { authReducer } from "../store/redux/auth-reducer";

Enzyme.configure({ adapter: new Adapter() });

describe("<Login /> unit test", () => {
  const getWrapper = (
    mockStore = createStore(authReducer, {
      firstName: null,
      isAuth: false,
      error: null,
      userId: null,
    })
  ) =>
    mount(
      <Router>
        <Provider store={mockStore}>
          <Login />
        </Provider>
      </Router>
    );

  it("should add to count and display the correct # of counts", () => {
    const wrapper = getWrapper();
    expect(wrapper.find("h1").text()).toEqual("Sign in");
    wrapper.find('[className="MuiButton-label"]').simulate("click");
    expect(wrapper.find("#email-helper-text"));
  });
});
