import { connect } from "react-redux";
import React from "react";
import { reducersType } from "../../redux/reducers";
import {
  createDemo1Action,
  createDemo2Action,
} from "../../redux/actions_creators/test_action";

function Admin(props: reducersType) {
  console.log(props);
  return <div>Admin</div>;
}

export default connect(
  (state: reducersType) => ({
    test: state.test,
  }),
  {
    demo1: createDemo1Action,
    demo2: createDemo2Action,
  }
)(Admin);
