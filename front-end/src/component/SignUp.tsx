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
    userName: Joi.string().required().min(3),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
    
})
type formType = {
    userName: string
    email: string
    password: string
}
const SignUp = () => {
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
            userName: '',
            email: '',
            password: '',
        
        }
    })
    const {mutate} = useMutation({
        mutationFn: async(user: formType)=>{
            return await axios.post(`http://localhost:8080/api/auth/signUp`, user)

        },
        onSuccess: ()=>{
            toast.success('Đăng ký thành công!')
            navigate('/signIn')
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
             <h1>Đăng ký</h1>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className='inputType'>
                    <label htmlFor="">User Name</label>
                    <input type="text" {...register('userName', {required: true, minLength: 3})} />
                    {errors.userName && <p className='text-danger'>{errors.userName.message}</p>}
                </div>
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
                        <button disabled={!isDirty}>Đăng ký</button>
                        <span>Bạn đã có tài khoản đăng nhập <Link className='active_login' to={`/login`}>Tại đây!</Link></span>
                </div>
            </form>
        </div>
      </div>
    <ToastContainer/>

    </>
  )
}

export default SignUp