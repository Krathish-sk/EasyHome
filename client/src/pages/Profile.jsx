import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser, deleteUser } from "../redux/user/userSlice";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
          return;
        }
        dispatch(updateUser(data));
        toast.success("User updated successfully");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Password do not match");
    }
  }

  async function handleDeleteUser() {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      dispatch(deleteUser());
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleSignOut() {
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      dispatch(deleteUser());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input type="file"  /> */}
        <img
          src={currentUser.photo}
          alt={currentUser.username}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        {/* <p className=""></p> */}
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          defaultValue={currentUser.password}
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="confirmPassword"
          placeholder="Confirm Password"
          defaultValue={currentUser.confirmPassword}
          id="confirmPassword"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-90"
        >
          Update
        </button>
        <Link
          to="/create-listing"
          className="bg-green-700 text-white p-3 rounded-lg text-center hover:opacity-90"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      {/* <button onClick={handleShowListing}></button> */}
    </div>
  );
}
