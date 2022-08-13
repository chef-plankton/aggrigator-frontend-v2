import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader viewBox="60 0 500 50" backgroundColor="#e8e8e8">
    {/* Only SVG shapes */}
    <rect x="70" y="35" rx="3" ry="3" width="100%" height="10" />
  </ContentLoader>
);
export default MyLoader;
