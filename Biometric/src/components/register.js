import React, {useRef, useEffect, useState} from "react";
import './main.css'



function Register() {

  const [name, setname] = useState("")
  const [id, setid] = useState("")
  const [department, setdepartment] = useState("")
  const [status, setstatus] = useState("")
  const [vaccine, setvaccine] = useState("")
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
    const data = {
    'name': {name},
    'm_id': {id},
    'department': {department},
    'm_type': {status},
    'm_vaccination': {vaccine},
    'img64': imageURL}
    console.log(data)
    fetch('http://127.0.0.1:5000/verify', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    }).then(async response => {
       try {
       const data = await response.json()
       console.log('response data?', data)
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

  const test =(e)=>{
  let file = e.target.files[0]
  console.log("this is the file",file)
  }

  return (
    <div className="main">

        <div className='Heading'>
        <h2>NEW MEMBER REGISTRATION</h2>
        </div>
        <form>
        <div className="camera">
        <video ref={videoRef}></video>
        <button className="btn" onClick={takePhoto}>Register</button>
        </div>
        <div className="result">
        <canvas ref={photoRef}></canvas>
        <button className="btn" onClick={closePhoto}>Close</button>
        </div>
        <div className="infobox">
        <h5>INFORMATION</h5>
        <div className="inputsection">
        <input
          type="text"
          placeholder="Enter Member Name"
          value={name}
          className = "inputarea"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Member NYU ID"
          value={id}
          className = "inputarea"
          onChange={(e) => setid(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Member Department"
          value={department}
          className = "inputarea"
          onChange={(e) => setdepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student / Staff"
          value={status}
          className = "inputarea"
          onChange={(e) => setstatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Yes if vaccination is Done"
          value={vaccine}
          className = "inputarea"
          onChange={(e) => setvaccine(e.target.value)}
        />
        </div>
        </div>
        </form>
    </div>
  );
}

export default Register;