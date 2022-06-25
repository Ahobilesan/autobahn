import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import "./index.css"

export default function Loader() {
  return (
    <div className='Loader'>
      <CircularProgress />
    </div>
  );
}
