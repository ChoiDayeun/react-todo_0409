import "@/app/globals.css";

export const metadata = {
  title: "Todo App",
  description: "Todo React App using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ backgroundImage: "url('/todobg.jpg')" }}>{children}</body>
    </html>
  );
}