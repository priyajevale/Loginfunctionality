// import { useState, useRef } from 'react';

// import classes from './AuthForm.module.css';

// const AuthForm = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const emailInputRef=useRef();
//   const passwordInputRef=useRef();

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };
  // const submitHandler = (event) => {
  //   event.preventDefault();
  
  //   const enteredEmail = emailInputRef.current.value;
  //   const enteredPassword = passwordInputRef.current.value;
  //   let url = 'ttps://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI'; // Replace YOUR_API_KEY with your actual Firebase API key
  
  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email: enteredEmail,
  //       password: enteredPassword,
  //       returnSecureToken: true
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       return res.json().then(data => {
  //         let errorMessage = 'Authentication failed';
  //         if (data && data.error && data.error.message) {
  //           errorMessage = data.error.message;
  //         }
  //         throw new Error(errorMessage);
  //       });
  //     }
  //   })
  //   .then(data => {
  //     // Store the token securely
  //     localStorage.setItem('token', data.idToken); // Store in localStorage for example
  //     console.log(data.idToken); // Log the token in the console
  //     // Perform further actions, such as redirecting the user or updating the UI
  //   })
  //   .catch(err => {
  //     alert(err.message); // Show authentication failure message
  //   });
  // };
  // const submitHandler = (event) =>{
  //   event.preventDefault();

  //   const enteredEmail=emailInputRef.current.value;
  //   const enteredPassword=passwordInputRef.current.value;
   
  //   let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI';

//     if(isLogin){
// url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI';
//     }else{
//       url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI'
        
//     }
//     fetch (url ,
//     {
// method:'POST',
// body:JSON.stringify({

// email:enteredEmail,
// password:enteredPassword,
// returnSecureToken:true
// }),
// headers:{
// 'Content-Type':'application/json'
// }
//     }
//     ).then(res =>{
    
//         if(res.ok){
//           return res.json();

//         }else{
//             res.json().then(data =>{
//                let errorMessage='Authentication falied';
               
//                throw new Error (errorMessage);
//             });
//         }
//     }).then(data=>{
// console.log(data);
//     }).catch(err=>{
//       alert(err.message);
//     });
//   };

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor='email'>Your Email</label>
//           <input type='email' id='email' required ref={emailInputRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='password'>Your Password</label>
//           <input
//             type='password'
//             id='password'
//             required ref={passwordInputRef}
//           />
//         </div>
//         <div className={classes.actions}>
//           <button> {isLogin ? 'Login' : 'Create Account'}</button>
//           <button
//             type='button'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AuthForm;
import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../Store/Auth-Context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key= AIzaSyC1IXLN20_EreGYaxaaP4J9YTyTAH5OvwI'; // Replace YOUR_API_KEY with your actual Firebase API key

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      }
    })
    .then(data => {
      // Store the token securely
      localStorage.setItem('token', data.idToken); // Store in localStorage for example
      authCtx.login(data.idToken); // Update authentication state
      // Clear input fields
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
    })
    .catch(err => {
      alert(err.message); // Show authentication failure message
      // Clear input fields
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;