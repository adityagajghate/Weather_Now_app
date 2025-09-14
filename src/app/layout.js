import "./globals.css";

export const metadata = {
  title: "Weather Now",
  description: "Real-time weather updates powered by Open-Meteo API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 via-white to-teal-50 text-gray-900 font-sans min-h-screen flex flex-col antialiased">
        
        {/* Header */}
        <header className="bg-[#005F5A] text-white shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 gap-4">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="text-3xl animate-pulse">🌤️</div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Weather Now
              </h1>
            </div>
            
            {/* Tagline */}
            <p className="text-sm font-medium text-teal-100 text-center sm:text-right">
              Real-Time Weather Updates for Any City
            </p>
          </div>
        </header>
        
        {/* Main */}
        <main className="flex-1 flex justify-center items-start p-6 sm:p-8 lg:p-10">
          <div className="max-w-7xl w-full">{children}</div>
        </main>
        
        {/* Footer */}
        {/* Footer */}
<footer className="bg-[#005F5A] text-white mt-auto border-t border-teal-700">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 items-center gap-4 p-4 sm:p-6 text-sm">

    {/* Left - Copyright */}
    <p className="text-center sm:text-left">
      © {new Date().getFullYear()} <span className="font-semibold">Weather Now</span>
    </p>

    {/* Middle - Attribution */}
    <p className="text-center">
      Powered by{" "}
      <a
        href="https://open-meteo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-teal-200 transition-colors"
      >
        Open-Meteo
      </a>{" "}
      • Developed by{" "}
      <a
        href="https://www.linkedin.com/in/aditya-gajghate-359959301/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-teal-200 transition-colors"
      >
        Aditya Gajghate
      </a>
    </p>

    {/* Right - Tagline */}
    <div className="text-center sm:text-right text-xs text-teal-100 font-medium tracking-wide">
      Accurate • Instant • Anywhere
    </div>
  </div>
</footer>

      </body>
    </html>
  );
}
