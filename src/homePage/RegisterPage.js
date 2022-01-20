import axios from 'axios';
import { useState, useEffect } from 'react';

function RegisterPage() {
    const [register, setRegister] = useState({title: " ", writer: " ", content: " ",});

    useEffect(() => {
        axios.get('http://localhost:8080/post').then((res) => {
            setRegister(res.data);
            console.log(res.data);
        });
    }, []);

    const postRegister = () => {
        axios.post('http://localhost:8080/post', {
            title: register.title,
            writer: register.writer,
            content: register.content,
          })
          .then((res) => {
            console.log('정상적으로 등록했습니다.');
          });
    };

    return (
        <>
            <div>
                제목:{' '}
                <input
                    value={register.title|| ''}
                    onChange={(e) => {
                        setRegister({ ...register, title: e.target.value });
                    }}
                />
                <br />
                이름:{' '}
                <input
                    value={register.writer|| ''}
                    onChange={(e) => {
                        setRegister({ ...register, writer: e.target.value });
                    }}
                />
                <br />
                내용:{' '}
                <input
                    value={register.content|| ''}
                    onChange={(e) => {
                        setRegister({ ...register, content: e.target.value });
                    }}
                />
            </div>
            <button onClick={postRegister}>게시글 작성</button>
        </>
    )
}

export default RegisterPage;