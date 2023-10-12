import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser, deleteUser } from "../redux/user/userSlice";
import { app } from "../firebase";
import { Meta } from "../components";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    number: currentUser.number,
    photo: currentUser.photo,
  });
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListings, setShowListings] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photo: downloadURL })
        );
      }
    );
  };

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

  async function handleShowListings() {
    setShowListings((prev) => !prev);
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  }

  async function handleListingDelete(listingId) {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
      }

      setUserListing((prev) => prev.filter((list) => list._id !== listingId));
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <Meta title={`EasyHomes - ${currentUser.username}`} />
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photo || currentUser.photo}
          defaultValue={formData.photo || currentUser.photo}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          defaultValue={formData.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={formData.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Phone"
          defaultValue={currentUser.number}
          id="number"
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
      <button onClick={handleShowListings} className="text-green-700 w-full">
        {showListings ? "Close Listing" : "Show Listings"}
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error in displaying listings" : ""}
      </p>
      {showListings && userListing && userListing.length > 0 && (
        <div className="flex flex-col gap-4 mb-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            My Listings
          </h1>
          {userListing.map((list) => (
            <div
              className="border border-slate-400 rounded-lg flex items-center justify-between p-3 gap-4 "
              key={list._id}
            >
              <Link to={`/listing/${list._id}`}>
                <img
                  src={list.imageUrls[0]}
                  alt={list.name}
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                to={`/listing/${list._id}`}
                className="text-slate-700 font-semibold hover:underline truncate flex-1"
              >
                <p>{list.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(list._id)}
                  className="text-red-700"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${list._id}`}>
                  <button className="text-green-700">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
