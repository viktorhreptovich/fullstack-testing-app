import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AuthService } from '../services/auth.service.ts';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router';
import { setAccessTokenToLocalStorage } from '../utils/storage/token.localstorage.ts';
import { useAppDispatch } from '../store/hooks.ts';
import { signUp } from '../store/slices/user.slice.ts';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const SignUp: FC = () => {
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

  const dispatch = useAppDispatch();

  const submitForm = async (data: FormValues) => {
    try {
      const result = await AuthService.signUp(data);
      if (result) {
        setAccessTokenToLocalStorage(result.access_token);
        dispatch(signUp(result.user));
        toast('Account created successfully');
        reset();
      }
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Please try again later.';
      console.log('Status', error.response?.status);
      if (error.response?.status < 500 && error.response?.data?.message) {
        errorMessage = error.response?.data?.message.toString();
      }
      toast(errorMessage);
      setError('root.serverError', {
        type: 'server',
        message: errorMessage,
      });
    }
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white" data-testid="page-signup">
      <h1 className="mb-10 text-center text-xl">Sign up</h1>
      <form className="flex w-1/3 flex-col gap-5" data-testid="form-signup" onSubmit={handleSubmit(submitForm)}>
        <fieldset disabled={isSubmitting} className="mx-0 flex w-auto flex-col gap-5">
          <div className="flex flex-col">
            <input
              type="text"
              className={`input ${errors?.username && 'input-error'}`}
              placeholder="Username"
              data-testid="input-username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 2,
                  message: 'Username must be at least 2 characters long',
                },
                onChange: (e) => setValue('username', e.target.value.trimStart()),
                onBlur: (e) => setValue('username', e.target.value.trim()),
              })}
            />
            {errors?.username && (
              <p className="error" data-testid="error-username">
                {errors.username?.message?.toString() || 'Invalid username'}
              </p>
            )}
          </div>
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
              data-testid="button-signup">
              {isSubmitting && <FaSpinner size={20} className="animate-spin" />}
              Sign up
            </button>
            {errors?.root && (
              <p className="error flex justify-center" data-testid="error-signup">
                {errors.root.serverError?.message?.toString()}
              </p>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <Link to={'/signin'} className="text-slate-300 hover:text-white" data-testid="link-go-signin">
              You already have an account?
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
