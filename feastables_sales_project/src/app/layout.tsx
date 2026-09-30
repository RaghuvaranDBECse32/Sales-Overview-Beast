import './globals.css';

export const metadata = {
  title: 'Feastables — $5B Chocolate Revolution',
  description: 'Explosive sales growth metrics for Feastables, the MrBeast chocolate brand.',
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
