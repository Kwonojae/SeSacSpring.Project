import axios from 'axios';
import { useState, useEffect } from 'react';


function RegisterPage() {
    const [register, setRegister] = useState({userId: " ", nickName: " ", email: " ", password: " "});

    useEffect(() => {
        axios.get('http://localhost:8080/members/register').then((res) => {
            setRegister(res.data);
        });
    }, []);

    const postRegister = () => {
        axios.post('http://localhost:8080/members/register', {
            email: register.email,
            userId: register.userId,
            password: register.password,
            nickName: register.nickName,
          })
          .then((res) => {
            console.log('정상적으로 등록했습니다.');
          });
    };

    return (
        <>
            <div>
                Email:{' '}
                <input
                    value={register.email|| ''}
                    onChange={(e) => {
                        setRegister({ ...register, email: e.target.value });
                    }}
                />
                <br />
                ID:{' '}
                <input
                    value={register.userId|| ''}
                    onChange={(e) => {
                        setRegister({ ...register, userId: e.target.value });
                    }}
                />
                PW:{' '}
                <input
                    value={register.password|| ''}
                    onChange={(e) => {
                        setRegister({ ...register, password: e.target.value });
                    }}
                />
                Nickname:{' '}
                <input
                    value={register.nickName|| ''}
                    onChange={(e) => {
                        setRegister({ ...register, nickName: e.target.value });
                    }}
                />
            </div>
            <button onClick={postRegister}>회원가입</button>
        </>
    )
}

export default RegisterPage;