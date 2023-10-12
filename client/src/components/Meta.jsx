import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="descripiton" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to EasyHomes",
  description:
    "Find the perfect place to buy, rent, sale your house at an amazing price.",
  keywords:
    "home, buy home, house, buy house, rent, rent house, sale, sale house",
};

export default Meta;
