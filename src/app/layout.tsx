import "./globals.css";
import type { Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileShell from "./components/MobileShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="bg-white">
        <MobileShell className="flex flex-col">
          {/* Header-ul rămâne sus */}
          <Header />

          {/* main cu flex-grow împinge Footer-ul în jos dacă pagina e goală */}
          <main className="flex-grow">{children}</main>

          {/* Footer-ul cu disclaimer-ul tău academic */}
          <Footer />
        </MobileShell>
      </body>
    </html>
  );
}
