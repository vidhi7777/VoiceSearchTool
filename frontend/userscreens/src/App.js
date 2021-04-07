import React from 'react';
import SpeechToText from './Components/SpeechToText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            MyntraMate
          </Typography>
        </Toolbar>
      </AppBar>
      <SpeechToText />
    </React.Fragment>

  );
}

export default App;
