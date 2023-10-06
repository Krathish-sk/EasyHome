import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3 px-5 text-sm sm:text-lg">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-lg flex flex-wrap">
            <span className="text-slate-500">Easy</span>
            <span className="text-slate-700">Homes</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Serach..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-slate-700 hidden sm:inline hover:underline hover:cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hidden sm:inline hover:underline hover:cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.photo}
                alt={currentUser.username}
              />
            ) : (
              <li className="text-slate-700 hover:underline hover:cursor-pointer">
                Sign-In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
