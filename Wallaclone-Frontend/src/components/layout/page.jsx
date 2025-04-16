export default function Page({ title, children }) {
    return (
      <div className="min-h-screen bg-gradient-to-l from-yellow-600 via-orange-500 to-red-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text drop-shadow-2xl mb-6">
            {title}
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
  
  