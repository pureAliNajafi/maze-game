import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar/navbar";
import clsx from "clsx";
import Head from "next/head";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/images/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="manifest" href="/manifest.json" />{" "}
      </Head>

      <body
        className={clsx(
          "overflow-y-hidden min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen bg-[#F1F6F9] dark:bg-[#141414] duration-300">
            <Navbar />
            <main className="container mx-auto max-w-4xl pt-3 lg:pt-6 px-6 flex-grow">
              <section dir="ltr" className="flex flex-col items-center justify-center">
                {children}
              </section>
            </main>
            {/*    <footer className="w-full flex items-center justify-center py-2">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://www.linkedin.com/in/ali-najafi-6832572a7/"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Developed By</span>
                <p className="text-primary">Ali Najafi</p>
              </Link>
            </footer> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
