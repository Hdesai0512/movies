import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Backgroundimage from '../components/Backgroundimage';
import Header from '../components/Header';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/Firebase-config';
export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email:"",
        password: "",
    });
    const navigate = useNavigate();

    const handleSignin = async () => {
        try{
            const { email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch(error){
            console.log(error);
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser)=>{
        if (currentUser) navigate("/");
    });

  return (
  <Container showPassword={showPassword}>
    <Backgroundimage />
    <div className="content">
    <Header login />
    <div className='body flex column a-center j-center'>
        <div className='text flex column'>
            <h1>Unlimited movies, Tv Shows and more</h1>
            <h4>Watch Anywher. Cancel Anytime.</h4>
            <h6>
                Ready to Watch? Enter your email to create or resume your subscription
              </h6>
        </div>
        <div className='form'>
            <input type='email' placeholder='Email Address' name='email' 
            value={formValues.email} 
            onChange={(e)=>
            setFormValues({...formValues,[e.target.name]:e.target.value})}/>

            {showPassword && (
            <input type='password' placeholder='Password' 
            onChange={(e)=>
            setFormValues({...formValues,[e.target.name]:e.target.value
            })
        }
         name='password'
         value={formValues.password} 
            />
            )}
            {!showPassword && (<button onClick={()=>setShowPassword(true)}>Get Started</button>)}
                   
        </div>
            {showPassword && <button onClick={handleSignin}>Sign Up</button>}
    </div>
    </div>
  </Container>
  );
}

const Container = styled.div`
    position: relative;
    .content{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        height: 100vh;
        weight: 100vw:
        display: grid;
        grid-template-rows: 15vh 85vh; 
    .body{
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
    h1{
        padding: 0 25rem;
    }
    }
    .form{
        display: grid;
        grid-template-columns:${({showPassword})=>showPassword ? "1fr 1fr" :"2fr 1fr"}; 
        width: 60%;
        input{
            color: black;
            border: none;
            padding: 1.5rem;
            font-size: 1.2rem;
            border: 1px solid black;
            &:focus{
                outline: none;
            }
        }
        button{
            padding: 0.5rem, 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
        }
        
    }
    button{
        padding: 0.4rem, 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
    }
    }

`;

