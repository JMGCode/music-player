import { Outlet } from "react-router-dom";
import { Header } from "../../Layout/Header";

const LibraryPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default LibraryPage;
