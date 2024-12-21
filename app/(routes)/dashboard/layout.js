import Header from "./_components/Header";
import Sidenav from "./_components/Sidenav";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden h-screen fixed md:block ">
        <Sidenav />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
