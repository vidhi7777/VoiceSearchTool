import React, { useState } from 'react';
import axios from 'axios';
import styles from '../CSS/SpeechToText.module.css';
import MicIcon from '@material-ui/icons/Mic';
import ReplayIcon from '@material-ui/icons/Replay';
import {Container,Box,TextField,Tooltip, Button} from '@material-ui/core';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Speech from 'react-speech';

const SpeechToText = React.memo(() => {

  const { transcript, resetTranscript} = useSpeechRecognition();
  const [micOn , setMic] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  function handleMicState(){
    if(!micOn){
      SpeechRecognition.startListening({continuous:true});
    }
    else{
      SpeechRecognition.stopListening();
      handleSearch();
    }
    setMic(!micOn);

  }

  function handleSearch(){
    console.log(transcript);
    if(transcript !== null && transcript !== ""){
      const url = "http://127.0.0.1:8080/api/user-query";
      const data = {command : transcript}
      axios.post(url, data).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error.response)
      })
    }
  }

  return (
      <Container className={styles.container}>
        <Box className={styles.box}>
          <TextField  
            value={transcript}
            className={styles.child1}/>
          {!micOn && (
            <Tooltip title="Speak" className={styles.child2}>
              <MicIcon 
                fontSize="large"
                color = "primary"
                onClick={handleMicState}
            />
            </Tooltip>
            
          )}
          {
            micOn && (
              <Tooltip title="Stop" className={styles.child2}>
                <MicIcon 
                  fontSize="large"
                  color ="secondary"
                  onClick={handleMicState}
                />
              </Tooltip> 
            )
          }
          <Tooltip title="Reset" className={styles.child2}>
            <ReplayIcon
              fontSize="large"
              color = "primary"
              onClick={resetTranscript}
            />
          </Tooltip>
        </Box>
        <Button variant="contained"color="primary" className={styles.button}>Talk to MyntraMate
          <Speech text="Hey there...I am your MyntraMate, how can I help you?" 
          lang="en-US" 
          voice="Daniel"
          />
        </Button>
      </Container>
  )
});
export default SpeechToText;