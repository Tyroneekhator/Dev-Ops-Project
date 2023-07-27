import "../styles/globals.css";
import Navbar from "../components/Navbar";
//import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "react-query";
import Alert from "../components/Alert";
import Error from "next/error";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-500 relative min-h-screen w-screen overflow-x-hidden">
      <div>
        <Script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        />
      </div>

      <SessionProvider>
        <div>
          <Navbar />
        </div>
        <div className="flex justify-between dark:text-white">
          <div className="order-1">
            {/* <div>
              <ol>
                <li>
                  <a href="/api/demos/api_error" target="_blank">
                    Demo Api error
                  </a>
                </li>
              </ol>
            </div> */}
            <SideNav />
          </div>
          <main className="container mx-auto mt-8 px-4 pt-6 object-fill max-w-full bg-gray-50 dark:bg-slate-500 order-2">
            <div className="d-flex justify-content-center align-items-center">
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </div>
          </main>
        </div>
        {/* <Footer /> */}
      </SessionProvider>
    </div>
  );
}

export default App;
