import Navbar from "@/components/Navbar";
import CombinedFooter from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <>
        <Navbar />
        {children}
        <CombinedFooter />
      </>
    </>
  );
}
