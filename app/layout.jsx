import Nav from "@components/Nav";
import Translate from "@components/Translate";
import Provider from "@components/Provider";
import "@styles/globals.css";
export const metadata = {
  title: "Quotegram",
  description: "Discover & Share Quotes",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Translate>
              <Nav />
            </Translate>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
