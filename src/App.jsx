import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [formInput, setFormInput]=useState({
    email:"",
    userName:"",
    password:""
  });
  const [trends, setTrends]=useState(null)

const handleChange=(e)=>{
 const {name, value}= e.target;
 
 setFormInput((prev)=>({
  ...prev,
  [name]: value,
}))
}
const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post(`https://twittertrendingstirr.onrender.com/run-script`,formInput, {
    headers: {
        "Content-Type": "application/json",
    }})
  
  .then(response => {
    console.log("user login");
    console.log("Response from server:", response.data);
    setTrends(response.data)
  })
  .catch(error => {
    console.error("Error  user login:", error); // Error handling
  });
}
  return (
    <>
    <h1>
      Top 5 Trending
    </h1>
    {trends ? (
      <>
      <p style={{fontWeight:"bold"}}>Time: {trends.end_time}</p>
      <p style={{fontWeight:"bold"}}>Ip Address:{trends.ip_address}</p>
      
      <ul >
          
          <li ><span style={{fontWeight:"bold"}}>Trend 1:</span> {trends.trend1}</li>
          <li ><span style={{fontWeight:"bold"}}>Trend 2:</span> {trends.trend2}</li>
          <li ><span style={{fontWeight:"bold"}}>Trend 3:</span> {trends.trend3}</li>
          <li ><span style={{fontWeight:"bold"}}>Trend 4:</span> {trends.trend4}</li>
          <li ><span style={{fontWeight:"bold"}}>Trend 5:</span> {trends.trend5}</li>
        
      </ul>
      </>
    ) : (
      <div className="loader">Loading...</div>
    )}
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your Email"
        name="email"
        value={formInput.email}
        onChange={handleChange}
        style={{border: '2px solid #ddd', padding: '15px', margin: '15px 15px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '16px'}}/>
      <input type="text"  placeholder="Your Username"
        name="userName"
        value={formInput.userName}
        onChange={handleChange}
        style={{border: '2px solid #ddd', padding: '15px', margin: '15px 0', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '16px'}}/>
      <input type="password"  placeholder="Your Password"
        name="password"
        value={formInput.password}
        onChange={handleChange}
        style={{border: '2px solid #ddd', padding: '15px', margin: '15px 15px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '16px'}}/>
    <button type='submit' style={{backgroundColor: 'black', color: 'white'}}>Click here to run the script</button>
    </form>
    
    </>
  )
}

export default App
