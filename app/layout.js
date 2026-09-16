import "./globals.css";

export const metadata = {
  title: "Bella Forneria Pizzaria | Mogi Guaçu",
  description: "Tradição italiana, preparo artesanal e sabor de verdade em Mogi Guaçu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
