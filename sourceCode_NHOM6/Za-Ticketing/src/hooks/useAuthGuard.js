import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthGuard = () => {
  const [authStatus, setAuthStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      setAuthStatus(user);
    } else {
      axios.get('http://localhost:3001/api/check-auth', { withCredentials: true })
        .then(response => {

          localStorage.setItem('user', JSON.stringify(response.data.user));
          setAuthStatus(response.data.user);
        })
        .catch(error => {
          setAuthStatus(null);
          navigate('/login');
        });
    }
  }, [navigate]);

  return authStatus;
};

export default useAuthGuard;
