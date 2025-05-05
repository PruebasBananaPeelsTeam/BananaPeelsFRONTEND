import Header from './header'
import Footer from './footer'

export default function Page({ title, children, fullWidth = false }) {
  return (
    <div
      className="flex flex-col min-h-screen bg-[rgb(245,245,220)] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <Header />

      <main className="flex-1 px-2 py-8 flex justify-center items-start">
        <div className={`${fullWidth ? 'w-full' : 'w-full md:max-w-6xl'} px-2 md:px-6 mx-auto`}>
          {title && (
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text drop-shadow-2xl mb-6 text-center">
              {title}
            </h2>
          )}
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
