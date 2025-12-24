import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      <div className="flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
