import Head from 'next/head';
export default ({ children }) => (
  <main>
    <Head lang="es">
      <title>Tasks | AFR</title>
      <meta
        charSet="utf-8"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link rel="stylesheet" href="../static/styles.css" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
      />
    </Head>

    {children}
  </main>
);
