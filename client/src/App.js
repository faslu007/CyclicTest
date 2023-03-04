import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('')
  

  useEffect(()=>{

    getData()
  },[])


  async function getData () {
    try {
      const response = await axios.get('/api/users')
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  };

  async function sendEmail() {
    try {
      const { data } = await axios.post(
        '/api/sendemail',
        { "email": email }, // wrap the email in an object
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if(data.message && data.message == 'Email sent'){
        const notify = () => toast("Email sent successfully!");
        notify();
        console.log(data)
      }
    } catch (error) {
      const notify = () => toast("Error!");
        notify();
      console.error(error);
    }
  }
  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test from faslu
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello from Faslu
        </a>
        <label htmlFor="email"></label>
        <input id="email" type="email" onChange={(e)=> setEmail(e.target.value)}></input>
        <button onClick={sendEmail}>Send email</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
