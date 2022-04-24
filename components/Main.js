import React from "react";
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';
import { useSelector } from 'react-redux';

function Main({app}) {
    //const dispatch = useDispatch();
    //const { fetchUser } = bindActionCreators(actionCreators, dispatch);
    //var user = useSelector((state) => state.user);
    useEffect(() => {
        fetchUser(app, 'bTUL23jiT6cTn8bxEXkdqyQkHdx2' )
      }, [])

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>User is logged in</Text>
    </View>
  );
}

export default Main;
