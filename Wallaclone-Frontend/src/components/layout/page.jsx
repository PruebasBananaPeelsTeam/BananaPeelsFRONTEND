import Header from './header';
import Footer from './footer';

export default function Page({ title, children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[rgb(245,245,220)]">
      <Header />
      
      <main className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
        {title && (
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text drop-shadow-2xl mb-6">
            {title}
          </h2>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
