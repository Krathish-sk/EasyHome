import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Contact({ listing }) {
  const { userRef, name, email } = listing;
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
  }, [userRef]);

  return (
    <>
      {homeOwner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{name.toLowerCase()}</span>
          </p>
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
            to={`mailto:${email}?subject=Regarding ${name} &body=${message}`}
            className="bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-90"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
