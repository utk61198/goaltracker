import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import {HiSpeakerphone} from "react-icons"
import {Button} from "@material-ui/core"
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
 
function Example(props) {
  const { speak } = useSpeechSynthesis();
 
  return (
    <div>
     
      <Button variant="outlined" onClick={() => speak({ text:props.speech })} style={{marginBottom:"20%"}} color="primary" endIcon={<RecordVoiceOverIcon/>} >Speak</Button>
    </div>
  );
}


export default Example