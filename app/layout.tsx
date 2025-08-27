export const metadata = {
  title: "Nyexsobaten Shortlink",
  description: "Simple URL shortener with Vercel KV",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#0b0c10', color: '#fff', fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
