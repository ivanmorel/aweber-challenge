import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ password1: '', password2: ''});
  const [error, setError] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e, field) => setForm(prevState => ({ ...prevState, [field]: e.target.value }));

  const { password1, password2 } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError([]);
    const currentError = [];
    if(password1 !== password2) currentError.push('Passwords must match.');
    if(password1.length < 6) currentError.push('Password must have a minimum length of 6 characters.');
    if(!/[A-Z]/.test(password1)) currentError.push('Password must have at least one uppercase.');
    if(!/[a-z]/.test(password1)) currentError.push('Password must have at least one lowercase.');
    if(!/[1-9]/.test(password1)) currentError.push('Password must have at least one number.');
    if(!/[!@#$%^&*()_\-+={[}]|:;"'<,>.]/.test(password1)) currentError.push('Password must have at least one special character.');
    setError(currentError);
    if(!hasSubmitted)setHasSubmitted(true);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="password1">Password</label>
      <input onChange={(e) => handleChange(e, 'password1')} value={password1} name="password1"/>
      <label htmlFor="password1">Repeat Password</label>
      <input onChange={(e) => handleChange(e, 'password2')} value={password2} name="password2" />
      <button type='submit'>Submit</button>
      {error.length > 0 ? hasSubmitted && error.map((e) => <div className='error' key={e}>{e}</div>) : hasSubmitted && <div className='success'>Success</div>}
    </form>
  );
}

export default App;
