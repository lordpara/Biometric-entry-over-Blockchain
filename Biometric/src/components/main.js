import React, {useRef, useEffect, useState} from "react";
import './main.css'
import {loadContract} from '../Utilis/web3tools.js';
import {connectWallet} from '../Utilis/connectWallet.js'

function Main(){

  const [data, setdata] = useState({})
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const getVideo = () =>{
    navigator.mediaDevices
        .getUserMedia({
            video: {width: 500, height: 500}
        })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err =>{
            console.error(err);
        })
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const takePhoto = () => {
    const width = 500;
    const height = 500;
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    let imageURL = photo.toDataURL('image/png')
    let response
    const data = {'img64': imageURL}
    fetch('http://127.0.0.1:5000/verify', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }).then(async response => {
       try {
       const data = await response.json()
       setdata(data.Prediction)
       if(data.Prediction["Message"] == "Match Found"){
       const connection = await connectWallet()
       let outputdata = await loadContract(data.Prediction["ID"])
       }
       else{
            let data = {}
            data["Name"] = "Unknown Person"
            data["ID"] = "-"
            data["Department"] = "-"
            data["Type"] = "-"
            data["Vaccination_Status"] = "-"
            setdata(data)
       }
       console.log('response data?', data)
       console.log("Process Done")
     } catch(error) {
       console.log('Error happened here!')
       console.error(error)
     }
    })

  }

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0, 0, photo.width, photo.height);
  }



  return (
    <div className="main">

        <div className='Heading'>
        <h2>PLEASE LOOK INTO THE CAMERA</h2>
        </div>
        <div className="camera">
        <video ref={videoRef}></video>
        <button className="btn" onClick={takePhoto}>Verify</button>
        </div>
        <div className="result">
        <canvas ref={photoRef}></canvas>
        <button className="btn" onClick={closePhoto}>Close</button>
        </div>
        <div className="infobox">
        <h5>INFORMATION</h5>
        <div className="infoarea">
        <p>Name: {data["Name"]}</p>
        <p>NYU ID: {data["ID"]}</p>
        <p>Department: {data["Department"]}</p>
        <p>Status: {data["Type"]}</p>
        <p>Vaccination Status:{data["Vaccination_Status"]}</p>
        </div>
        </div>
    </div>
  );
}

export default Main;