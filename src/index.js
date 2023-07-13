import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SignUp from './SignUp';
import Login from './Login';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {
  state = { isLogin: false };
  
  toggleLogin = () => {
    this.setState(prevState => ({ isLogin: !prevState.isLogin }));
  };

  render() {
    const { isLogin } = this.state;

    return (
      <>
        {isLogin ? <Login /> : <SignUp />}
        <button onClick={this.toggleLogin}>{isLogin ? 'Go to SignUp' : 'Go to Login'}</button>
      </>
    );
  }
}

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
