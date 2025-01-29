import { FC } from 'react';
import image404 from '../assets/error-404.png';
import { Link } from 'react-router';

const Error: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-900 font-roboto text-white">
      <img src={image404} alt="404" className="w-1/3" />
      <Link to="/" className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600">
        Back
      </Link>
    </div>
  );
};

export default Error;
