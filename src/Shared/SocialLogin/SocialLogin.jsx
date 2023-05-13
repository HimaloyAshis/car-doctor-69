import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const SocialLogin = () => {

    const {googleSignIn} = useContext(AuthContext)

    const handleGoogle =()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>console.log(error.message))
    }

    return (
        <div className='text-center'>
            <div className="divider">OR</div>
            <button onClick={handleGoogle} className="btn btn-circle">
                G
            </button>
        </div>
    );
};

export default SocialLogin;