import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import './App.css'

function App() {
const signUpSchema = z.object({
  name:z.string().min(1,{message:"Name is reqiured"}),
  email:z.string().min(1,{message:"Email is reqiured"}).email({message:"Invalid email address"}),
password:z.string().min(6,{message:"Password must be at least 6 characters"}),
confirm_password:z.string().min(6,{message:"Confirm password must be at least 6 characters"}),
})
.refine((data)=>data.password === data.confirm_password,{
  message:"password do not match",
  path:['confirm_password'],
})
type SignUpInput = z.infer<typeof signUpSchema>;
const {handleSubmit , register ,reset ,formState:{errors , isSubmitting}} = useForm<SignUpInput>({
  mode: "onChange",
  resolver: zodResolver(signUpSchema),
});
const onSubmit:SubmitHandler<SignUpInput> = ({name,email,password}) => {
  const user={
    name:name,
    email:email,
    password:password,
  }
  reset();
  console.log(user);
}

  return (
    <>
    <div className="container">
<h2 className='form-title'>Registration Form</h2>
<form onSubmit={handleSubmit(onSubmit)}>
<div className='main-user-info'>
  <div className='user-input-box'>
<label htmlFor='name'>Name</label>
<input type="text" id="name" placeholder='Enter your name' {...register("name")}/>
 {errors.name && <p className='error-message'>{errors.name.message}</p>}

  </div>
   <div className='user-input-box'>
<label htmlFor='email'>Email</label>
<input type="email" id="email" placeholder='Enter your email' {...register("email")}/>
 {errors.email && <p className='error-message'>{errors.email.message}</p>}
  </div>

     <div className='user-input-box'>
<label htmlFor='password'>Password</label>
<input type="password" id="password" placeholder='Enter your password' {...register("password")}/>
  {errors.password && <p className='error-message'>{errors.password.message}</p>}

  </div>
   <div className='user-input-box'>
<label htmlFor='confirm_password'>Confirm password</label>
<input type="password" id="confirm_password" placeholder='Enter your confirm password' {...register("confirm_password")}/>
 {errors.confirm_password && <p className='error-message'>{errors.confirm_password.message}</p>}

  </div>
</div>

<button type="submit" className='submit-btn' disabled={isSubmitting}>Register</button>
</form>

    </div>
    </>
  )
}

export default App;
