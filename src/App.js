import './App.css';
import QRCode from 'qrcode.react';
import {useState,useEffect} from 'react'
import CreateShortLink from './CreateShortLink'

function App() {
  // const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  // const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  const [url,setUrl] =useState("");
  const [validUrl,setValidUrl] = useState(false);
  useEffect(()=>{
    // console.log(url,urlRegex.test(url))
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if(urlRegex.test(url))
      setValidUrl(true)
    else
      setValidUrl(false)
  }
    
    ,[url])
  const handleDownload=()=>{
    const canvas = document.getElementById("qrcode")
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${url}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div style={{alignItems:'center' ,flex:1,flexDirection:'row'}}>
      <input style = {{flex:1}}onChange={e=>setUrl(e.target.value)} value={url} placeholder="Please provide url"/>
      {!validUrl?<h4 style={{color:'red',visibility:!validUrl,flex:1}} > Url is invalid </h4>:null}
      {validUrl?
      <div>
        {/* <div id ="qrcode"> */}
        <QRCode style = {{flex:1}} id="qrcode" value={url} />
        {/* </div > */}
        <button onClick={()=>handleDownload()}>Download QR code</button>
        <CreateShortLink originalLink = {url}/>
      </div>
      :null}
    </div>
  );
}

export default App;
