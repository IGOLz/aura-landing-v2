import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura - Trade Everything",
  description: "Perps, sports, politics, & more",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon1.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
