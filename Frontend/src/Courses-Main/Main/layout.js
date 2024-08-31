import Navbar from "./navbar";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }} className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
