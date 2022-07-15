
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

//redux
import { store } from "./redux/store";
import { fetchAllPost } from './slices/saga';

//component
import Navbar from "./components/navbar"
import Drawer from "./components/drawer"
import Loader from './components/loader';
import List from "./components/list";
import Modal from "./components/modal-form";
import AckModal from "./components/modal-ack";

import { Box } from '@mui/material';


const state = store.getState();

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllPost());
  })

  return (
    <div className="App">
      {(!state || state.root.primeloader) && <Loader />}
      {state && state.post && <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Drawer open={state.root.openDrawer} />
        <List data={state.post.posts} />
      </Box>}
      {state && state.root.modalData && <Modal data={state.root.modalData} open={state.root.openModal} />}
      {state && state.root.modalData && <AckModal data={state.root.modalData} open={state.root.openAckModal} />}
    </div>
  );
}

export default App;