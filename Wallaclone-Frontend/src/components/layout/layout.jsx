import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[rgb(245,245,220)] py-8">{children}</main>
      <Footer />
    </div>
  );
}
