import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Contact({ listing, handleClose }) {
  const [homeOwner, setHomeOwner] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
        }
        setHomeOwner(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchOwner();
  }, [listing.userRef]);

  return (
    <>
      {homeOwner && (
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between items-center">
            <p className="text-center">
              Contact{" "}
              <span className="font-semibold">
                {homeOwner.username.toLowerCase()}
              </span>{" "}
              for{" "}
              <span className="font-semibold">
                {listing.name.toLowerCase()}
              </span>
            </p>
            <AiOutlineCloseCircle
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </div>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          />
          <Link
            to={`mailto:${homeOwner.email}?subject=Regarding ${homeOwner.username} &body=${message}`}
            className="bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-90"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
