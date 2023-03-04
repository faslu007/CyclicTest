import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react"
import axios from "axios"

function App() {
  const [data, setData] = useState([]);

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
    </div>
  );
}

export default App;
