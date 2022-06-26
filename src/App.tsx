
import React from 'react';
import './App.css';

import API from "./assets/api/";

//redux
import { store } from "./redux/store";
import * as actions from './redux/actions';

//component
import Navbar from "./components/navbar"
import Drawer from "./components/drawer"
import Loader from './components/loader';
import List from "./components/list";
import Modal from "./components/modal-form";
import AckModal from "./components/modal-ack";

import { Box } from '@mui/material';

class App extends React.Component {

  render() {
    const state = store.getState()
    return (
      <div className="App">
        {(!state || state.primeloader) && <Loader />}
        {state && state.post && <Box sx={{ display: 'flex' }}>
          <Navbar />
          <Drawer open={state.openDrawer} />
          <List data={state.post} />
        </Box>}
        {state && state.modalData && <Modal data={state.modalData} open={state.openModal} />}
        {state && state.modalData && <AckModal data={state.modalData} open={state.openAckModal} />}
      </div>
    );
  }

  componentDidMount() {
    store.subscribe(this.forceUpdate.bind(this));

    this.getAllPost()
  }

  async getAllPost() {
    let posts = await API.getAll();
    if (posts.error === false) {
      await store.dispatch({ type: actions.SET_POST, data: posts.data })
    } else {
      await store.dispatch({ type: actions.SET_POST, data: [] })
    }
  }
}

export default App;