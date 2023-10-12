import { BsGithub, BsLinkedin, BsPersonCircle } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Meta } from "../components";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <Meta title={"EasyHomes - About"} />
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        About EasyHomes
      </h1>
      <p className="mb-4 text-slate-700">
        EasyHomes is a leading real estate agency that specializes in helping
        clients buy, sell, and rent properties in the most desirable
        neighborhoods. Our team of experienced agents is dedicated to providing
        exceptional service and making the buying and selling process as smooth
        as possible.
      </p>
      <p className="mb-4 text-slate-700">
        Our mission is to help our clients achieve their real estate goals by
        providing expert advice, personalized service, and a deep understanding
        of the local market. Whether you are looking to buy, sell, or rent a
        property, we are here to help you in every step of the way.
      </p>
      <p className="mb-4 text-slate-700">
        Our team of agents has a wealth of experience and knowledge in the real
        estate industry, and we are committed to providing the highest level of
        service to our clients. We believe that buying or selling a property
        should be an exciting and rewarding experience, and we are dedicated to
        making that a reality for each and every one of our clients.
      </p>
      <div className="flex items-center justify-center text-xl gap-4 mt-10 text-blue-600">
        <Link
          target="_blank"
          to="https://github.com/Krathish-sk?tab=repositories"
        >
          <BsGithub className="text-slate-800" />
        </Link>
        <Link target="_blank" to="https://www.linkedin.com/in/krathish-k/">
          <BsLinkedin />
        </Link>
        <Link target="_blank" to="https://twitter.com/KrathishK">
          <AiFillTwitterCircle className="text-2xl" />
        </Link>
        <Link target="_blank" to="https://krathish-k-portfolio.netlify.app/">
          <BsPersonCircle className="text-slate-400" />
        </Link>
      </div>
    </div>
  );
}
