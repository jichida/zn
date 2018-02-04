import * as xview from './xview/Common';

const playaudio = (audioname)=>{
  try{
    xview.playaudio(audioname);
  }
  catch(e){
    console.log(e);
  }
}

export {playaudio};
