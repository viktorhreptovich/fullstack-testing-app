import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AuthService } from '../services/auth.service.ts';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router';
import { setAccessTokenToLocalStorage } from '../utils/storage/token.localstorage.ts';
import { useAppDispatch } from '../store/hooks.ts';
import { signIn } from '../store/slices/user.slice.ts';

type FormValues = {
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

  const dispatch = useAppDispatch();

  const submitForm = async (data: FormValues) => {
    try {
      const result = await AuthService.signIn(data);
      if (result) {
        setAccessTokenToLocalStorage(result.access_token);
        dispatch(signIn(result.user));
        reset();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message.toString() || 'Something went wrong. Please try again later.';
      toast(errorMessage);
      setError('root.serverError', {
        type: 'server',
        message: errorMessage,
      });
    }
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white" data-testid="page-signup">
      <h1 className="mb-10 text-center text-xl">Sign in</h1>
      <form className="flex w-1/3 flex-col gap-5" data-testid="form-signup" onSubmit={handleSubmit(submitForm)}>
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
              Sign in
            </button>
            {errors?.root && (
              <p className="error flex justify-center" data-testid="error-signup">
                {errors.root.serverError?.message?.toString()}
              </p>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <Link to={'/signup'} className="text-slate-300 hover:text-white" data-testid="link-go-signup">
              Don&apos;t have an account?
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
