import AccountCircle from '@mui/icons-material/AccountCircle';
import { Container, InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Auth';

import axios from "axios";

import './login.css';

const LogInAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  localStorage.removeItem('auth-token');
  localStorage.removeItem('user');
  localStorage.removeItem('username',username);

  const redirectPath = location.state?.path || '/'
 
  const handleLogin = () => {
      axios.post(`/users/admin/login`, {
          username: username,
          password: password
      })
      .then(function (response) {
          if(response.status === 200){
              alert('Login completed');
              setSubmit(false);
              setUsername('');
              setPassword('');
              // save auth on localStorage
              localStorage.setItem('auth-token',response.data.token);
              localStorage.setItem('user','admin');
              localStorage.setItem('username',username);
              auth.login(username);
              auth.loginAdmin(true);
              navigate(redirectPath );
          }
      })
      .catch(function (error) {
          if(error.response.status === 400){
              alert(error.response.data['data'])
          }
      });
  }


  return (
    <div className='loginpage'>
      <Container>
        <div className='login__box'>
          <div className='login__form'>
              <Box
                  component="form"
                  sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                  }}

                  autoComplete="off"
              >
                <TextField id="regis-username" label="Username" variant="filled" 
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    error={submit===true&&username === ''}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        ),
                        }
                    }
                />
                <TextField 
                    id="regis-password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    autoComplete="current-password"
                    variant="filled"
                    error={submit===true&&password === ''}
                />
              </Box>
            <button onClick={handleLogin} className="btn btn-form">Admin Login</button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LogInAdmin
