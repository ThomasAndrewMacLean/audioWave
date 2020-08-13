import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';
import { prefix } from '../utils';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="manifest" href={`${prefix}/manifest.json`} />
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
          {/* 
          <script
            dangerouslySetInnerHTML={{
              __html: `  window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault()
                return false;
            });`,
            }}
          ></script> */}{' '}
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.0.16/svg.js"
            integrity="sha256-xvPMiuI2yhll8na232NQ1y4TB2G8QzRKc1gEqImu4Ms="
            crossorigin="anonymous"
          ></script>
          <script src="https://use.fontawesome.com/040f5e91ce.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
