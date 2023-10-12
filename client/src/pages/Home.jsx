import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { ListingItem } from "../components";

export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListings();
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
        fetchSaleListings();
      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top section */}
      <div className="flex flex-col gap-6 p-8 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next
          <span className="text-slate-500"> perfect</span>
          <br />
          stay with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          EasyHomes, an one stop for finding your next place to live.
          <br />
          Tons of properties to choose from.
          <br />
          Sell,rent or purchase with an ease.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Lets get started...
        </Link>
      </div>
      {/* Swiper */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((list) => (
            <SwiperSlide key={list._id}>
              <div
                style={{
                  background: `url(${list.imageUrls[0]}) center no-repeat `,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                On Offer Deals
              </h2>
              <Link
                to="/search?offer=true"
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListing.map((list) => (
                <ListingItem key={list._id} listing={list} />
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                On Rent Deals
              </h2>
              <Link
                to="/search?type=rent"
                className="text-blue-800 text-sm hover:underline"
              >
                Show more rented deals
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListing.map((list) => (
                <ListingItem key={list._id} listing={list} />
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                On Sale Deals
              </h2>
              <Link
                to="/search?type=sale"
                className="text-blue-800 text-sm hover:underline"
              >
                Show more sale deals
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListing.map((list) => (
                <ListingItem key={list._id} listing={list} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
