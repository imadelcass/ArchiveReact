import Alert from '@mui/material/Alert';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../context/AlertContext';
function AlertMsg({ children }) {
  const { alert, setAlert } = useContext(AlertContext);
  const [alertTimeOut, setAlertTimeOut] = useState(null);

  useEffect(() => {
    if (alert.state) {
      setAlertTimeOut(setTimeout(() => setAlert({ state: false }), 6000));
    }
    return () => {
      alert.state && clearTimeout(alertTimeOut);
    };
  }, [alert]);
  return (
    <div className='z-100'>
      {children}
      {alert.state && (
        <Alert
          variant='filled'
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '200px',
            width: 'max-content',
          }}
          severity={alert.severity}
        >
          {alert.text}
        </Alert>
      )}
    </div>
  );
}

export default AlertMsg;
