import React, { useState,useEffect} from 'react';
import axios from 'axios';
import styles from '../CSS/SpeechToText.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MicIcon from '@material-ui/icons/Mic';
import ReplayIcon from '@material-ui/icons/Replay';
import { Container, Box, TextField, Tooltip, Button } from '@material-ui/core';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import ProductsSwiper from './ProductsSwiper';
import ProductContainer from './ProductContainer';
import Speech from 'react-speech';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SpeechToText = React.memo(() => {

  const { transcript, resetTranscript} = useSpeechRecognition();
  const [micOn , setMic] = useState(false);
  const [filterOn, setFilter] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [voiceText , setText ] = useState("Hey there,  I am your myntra Mate...how can I help you")
  const classes = useStyles();

  useEffect(() => {
    console.log("Started");
    //this is supposed to make the autoclick happen onload
    document.getElementsByClassName("rs-play").click();
  }, []);

  var items;
  var filter_items;
  var user_query = []

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  function doOnFilter(){
      setText("Please tell the location..")
      document.getElementById('liveOnLoad').click();
      
      //here timeout of 10 seconds

      setText("Please tell the location..")
      document.getElementById('liveLoad').click();

      handleFilterApply();
  }

  function handleFilterApply(){
    setFilter(true);
  }

  function handleFilterRemove(){
    setFilter(false);
  }

  function handleMicState(){
    if(!micOn){
      console.log("Listening");
      SpeechRecognition.startListening({continuous:true});
    }
    else {
      SpeechRecognition.stopListening();
      console.log("Stopped Listening");
      if(!filterOn){
        handleSearch();
      }
      else{
        user_query = [...user_query,transcript]
        handleFilterSearch(user_query.toString());
      }
      
    }
    setMic(!micOn);

  }

  function handleFilterSearch(user_query){
    if(user_query !== null && user_query !== ""){
      const url = "http://127.0.0.1:8080/api/weatherfilter/results";
      const data = {command : user_query}
      axios.get(url, {
        params:data
      }).then(response => {
        filter_items = JSON.parse(response.results);
        setFetched(true);
        console.log(filter_items);
      }).catch(error => {
        console.log(error.response)
      })
    }
  }

  function handleSearch() {
    console.log(transcript);
    user_query = [...user_query,transcript];
    if(transcript !== null && transcript !== ""){
      const url = "http://127.0.0.1:8080/api/results";
      const data = {command : transcript}
      axios.get(url, {
        params:data
      }).then(response => {
        items = JSON.parse(response.results);
        setFetched(true);
        console.log(items);
      }).catch(error => {
        console.log(error.response)
      })
    }
  }

  return (
    <React.Fragment>
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
              color="primary"
              onClick={resetTranscript}
            />
          </Tooltip>
          
          <Tooltip title="Location-Weather-Filter" className={styles.child2}>
            <FilterDramaIcon
              fontSize="large"
              color="primary"
              onClick={doOnFilter}
            />
          </Tooltip>

          <Button variant="contained" id="liveOnLoad" color="primary" className={styles.button}>Talk to MyntraMate
              <Speech text={voiceText}
              lang="en-US"
              displayText = "Launch the Bot"
              voice="Microsoft Zira Desktop - English (United States)"
            />
          </Button>

        </Box>
      </Container>
      { fetched &&(
          <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={filterOn}
            onClose={handleFilterRemove}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={filterOn}>
              <div className={classes.paper}>
                  <ProductsSwiper pro_list = {filter_items}/>
              </div>
            </Fade>
          </Modal>
          <ProductContainer pro_list = {items}/>
      </div>
      )}
    </React.Fragment>
  );
})
export default SpeechToText;