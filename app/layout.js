export const metadata = {
  title: 'NYEXSOBATEN — Shortlink',
  description: 'Simple shortlink powered by Upstash KV on Vercel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        minHeight: '100vh',
        backgroundColor: '#050816',
        color: 'white',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji'
      }}>
        {children}
      </body>
    </html>
  );
}
