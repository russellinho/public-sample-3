import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="ALTVERSE" />
          <meta
            name="description"
            content="We provide crypto escrow for safe contract and crypto transaction."
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="ALTVERSE" />
          <meta
            property="og:image"
            content="https://altverse.ai/og/img_main.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta name="twitter:site" content="@altverseai" />
          <meta name="twitter:site:id" content="1545599809457102850" />
          <meta name="twitter:creator:id" content="1545599809457102850" />
          <meta name="twitter:creator" content="@altverseai" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="Altverse, a protocol economy for Web3 gig freelancers"
          />
          <meta
            name="twitter:title"
            content="Altverse, Web3 gig freelancer's DAO protocol"
          />
          <meta
            name="twitter:image"
            content="https://altverse.ai/assets/img/root/ogmeta.png%22%3E"
          />
          <meta
            property="og:description"
            content="Discover GIG Freelancers for your next Web3 projects."
          />

          <meta
            name="facebook-domain-verification"
            content="nou3dl5ms87mgo2m5vlcf0yyuqay0e"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Nunito+Sans:wght@400;700&family=Mulish:wght@400;700&family=Quicksand:wght@400;500;700&family=Syncopate:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
