import '.././node_modules/bootstrap/dist/css/bootstrap.min.css'
import QRCode from 'qrcode.react';
import { useState, useEffect } from 'react'
import CreateShortLink from './CreateShortLink'

function App() {
  const [url, setUrl] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  useEffect(() => {
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (urlRegex.test(url))
      setValidUrl(true)
    else
      setValidUrl(false)
  }

    , [url])
  const handleDownload = () => {
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
    <div class="card text-center" style={{ width: "100%" }}>
      <div class="card-header">
        <input style={{ width: '100%' ,borderColor:'#C70039' ,borderRadius:'5px'}} onChange={e => setUrl(e.target.value)} value={url} placeholder="Please provide url" />
        {!validUrl ? <h6 style={{ color: '#C70039 ', visibility: !validUrl }} > Url is invalid </h6> : null}
      </div>
      {validUrl ?
        <div class="card-body">
          <QRCode style={{ alignSelf: 'center' }} id="qrcode" value={url} />
          <h5 class="card-title">{url}</h5>
          <div>
            <h6>Short Url :</h6>
            <CreateShortLink originalLink={url} />
          </div>
          <button type="button" class="btn btn-secondary" onClick={() => handleDownload()}>Download QR code</button>
        </div>
        : null
      }
    </div>
  );
}

export default App;
