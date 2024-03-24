import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

interface ISidebar {
  children: React.ReactNode;
}

async function Sidebar({ children }: ISidebar) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-[inherit]">{children}</main>
    </div>
  );
}

export default Sidebar;
