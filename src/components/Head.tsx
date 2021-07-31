import NextHead from 'next/head'

export type Props = {
  pageTitle?: string | void
}

const SiteHead = 'IGDA Climate SIG'

export const Head = ({ pageTitle }: Props): JSX.Element => (
  <NextHead>
    <title>
      {[pageTitle, SiteHead].filter((value) => value !== undefined).join(' - ')}
    </title>
    <link rel="icon" href="/favicon.ico" />
    <link
      rel="icon"
      href="/IGDA_Vortex_RGB-01_32x32.png"
      sizes="16x16"
      type="image/ico"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link rel="dns-prefetch" href="//use.fontawesome.com" />
    <link
      rel="stylesheet"
      id="fontawesome-styles-css"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css?ver=5.8.1"
      type="text/css"
      media="all"
    />
  </NextHead>
)

export default Head
