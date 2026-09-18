// src/app/layout.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="flex flex-col min-h-screen bg-white">
        {/* Header-ul rămâne sus */}
        <Header />

        {/* main cu flex-grow împinge Footer-ul în jos dacă pagina e goală */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer-ul cu disclaimer-ul tău academic */}
        <Footer />
      </body>
    </html>
  );
}





