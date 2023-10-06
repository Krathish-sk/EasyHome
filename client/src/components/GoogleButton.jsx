import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { provider, auth } from "../firebase";
import { signInUser } from "../redux/user/userSlice";

export default function GoogleButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleGoogleClick() {
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          number: result.user.phoneNumber,
        }),
      });
      const data = await res.json();
      dispatch(signInUser(data));
      navigate("/");
    } catch (error) {
      console.log("Error with Google Authentication");
    }
  }
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="p-3 bg-red-700 uppercase rounded-lg text-white hover:opacity-90"
    >
      Continue with Google
    </button>
  );
}
