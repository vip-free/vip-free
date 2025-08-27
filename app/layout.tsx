export const metadata = {
  title: "NYEXSOBATEN Shortlink",
  description: "URL Shortener powered by Next.js & Vercel KV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
