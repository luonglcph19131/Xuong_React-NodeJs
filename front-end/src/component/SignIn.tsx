import Joi from 'joi'
import '.././formAuth.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
const registerSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required()
})
type formType = {
    email: string
    password: string
}
const SignIn = () => {
    const navigate = useNavigate()
    const [isFail, setError] = useState(false)
    const [stringError, setString] = useState('')
    const {
        register,
        handleSubmit,
        formState: {errors, isDirty }
    }= useForm({
        resolver: joiResolver(registerSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const {mutate} = useMutation({
        mutationFn: async(user: formType)=>{
            return await axios.post(`http://localhost:8080/api/auth/signIn`, user)
           
        },
        onSuccess: (res)=>{
            toast.success('Đăng nhập thành công!')
            sessionStorage.setItem('token', JSON.stringify(res.data))
            navigate('/')
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any)=>{
           
            const errorCath = err.response.data.message
            setError(true)
            setString(errorCath)
        }
    })
    const onSubmit = (user: formType)=>{
        mutate(user)
    }
  return (
    <>
      <div className="container">
        <div className="sign_up_inner">
             <h1>Đăng Nhập</h1>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className='inputType'>
                    <label htmlFor="">Email</label>
                    <input type="email" {...register('email', {required: true})} />
                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}

                </div>
                <div className='inputType'>
                    <label htmlFor="">Password</label>
                    <input type="password"{...register('password', {required: true, minLength: 3})} />
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                </div>
                <div className="inputType">
                      {isFail && <p style={{textAlign: 'center', fontSize: '1.4rem'}} className='text-danger'>{stringError}</p>}
                </div>
                <div className='form_action'>
                        <button disabled={!isDirty}>Đăng Nhập</button>
                        <span>Bạn chưa có tài khoản đăng ký <Link className='active_login' to={`/signup`}>Tại đây!</Link></span>
                </div>
            </form>
        </div>
      </div>
    <ToastContainer/>

    </>
  )
}

export default SignIn