import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | wheel 4U</title>
    </Helmet>
  );
};

export default PageTitle;
