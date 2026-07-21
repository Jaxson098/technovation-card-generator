import { Instrument_Sans, Castoro } from "next/font/google";
import "./globals.css";


const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const castoro = Castoro({
  variable: "--font-castoro",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

export const metadata = {
  title: "Technovation Card Generator",
  description: "Generate innovation and partnership cards",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${castoro.variable} h-full antialiased`}
    >
      <body className="h-screen w-screen bg-primary">{children}</body>
    </html>
  );
}
