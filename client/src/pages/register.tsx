import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react'
import InputGroup from '../components/inputGroup'

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erros, setErros] = useState<any>({});

    let router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event?.preventDefault(); // 원래 동작인 Page refresh 발생 방지
        try {
            const res = await axios.post('/auth/register', {
                email, // Key와 Value가 같을 경우 이렇게 작성 가능
                password,
                username
            })

            console.log('res', res);
            router.push("/login");           
        }
        catch(error: any) {
            console.log('error', error);
            setErros(error?.response.data || {});
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex flex-col items-center jusity-cotent h-screen p-6'>
                <div className='w-10/12 mx-auto md:w-96'>
                    <h1 className='mb-2 text-lg font-medium'>회원가입</h1>
                    <form onSubmit={handleSubmit}>
                        <InputGroup
                            placeholder='Email'
                            value={email}
                            setValue={setEmail}
                            error={erros.email}
                        />
                        <InputGroup
                            placeholder='Username'
                            value={username}
                            setValue={setUsername}
                            error={erros.username}
                        />
                        <InputGroup
                            placeholder='Password'
                            value={password}
                            setValue={setPassword}
                            error={erros.password}
                        />
                        <button className='w-full py-2 mb-1 text-xs font-bold text-while uppercase bg-gray-400 border border-gray-400 rounded'>
                            회원가입
                        </button>   
                    </form>
                    <small>
                        이미 가입하셨나요?
                        <Link legacyBehavior href="/login">
                            <a className='ml-1 text-blue-500'>로그인</a>
                        </Link>
                    </small>
                </div>
            </div>      
        </div>
    )
}

export default Register
