import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthService } from '../services/auth.service.ts';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const SignIn: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'all',
  });

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const submitForm = async (data: FormValues) => {
    try {
      const result = await AuthService.signUp(data);
      if (result) {
        toast('Account created successfully');
        setIsLogin(true);
        reset();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message.toString() || 'Something went wrong';
      toast(errorMessage);
      setError('root.customServerError', {
        type: 'server',
        message: errorMessage,
      });
    }
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">Sign in</h1>
      <form className="flex w-1/3 flex-col gap-5" data-testid="form-auth" onSubmit={handleSubmit(submitForm)}>
        <fieldset disabled={isSubmitting} className="mx-0 flex w-auto flex-col gap-5">
          <div className="flex flex-col">
            <input
              type="text"
              className={`input ${errors?.email && 'input-error'}`}
              placeholder="Email"
              data-testid="input-email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email is not valid',
                },
                onChange: (e) => setValue('email', e.target.value.trimStart()),
                onBlur: (e) => setValue('email', e.target.value.trim()),
              })}
            />
            {errors?.email && (
              <p className="error" data-testid="error-email">
                {errors.email?.message?.toString() || 'Invalid email'}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              className={`input ${errors?.password && 'input-error'}`}
              placeholder="Password"
              data-testid="input-password"
              onFocus={async () => {
                if (errors.root) {
                  clearErrors('root');
                  await trigger();
                }
              }}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
                onChange: (e) => setValue('password', e.target.value.trimStart()),
                onBlur: (e) => setValue('password', e.target.value.trim()),
              })}
            />
            {errors?.password && (
              <p className="error" data-testid="error-password">
                {errors.password?.message?.toString() || 'Invalid password'}
              </p>
            )}
          </div>
          <div>
            <button
              className={`btn btn-green mx-auto ${!isValid && 'btn-disabled'}`}
              disabled={!isValid}
              data-testid="button-auth">
              {isSubmitting && <FaSpinner size={20} className="animate-spin" />}
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
            {errors?.root && (
              <p className="error flex justify-center" data-testid="error-auth">
                {errors.root.customServerError?.message?.toString()}
              </p>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <Link to={'/signup'} className="text-slate-300 hover:text-white" data-testid="button-go-signin">
              Don&apos;t have an account?
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
