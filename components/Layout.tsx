import Link from 'next/link';
import Head from 'next/head';

export const Layout = ({ children, title, description }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
    <div className='container'>
      <nav>
        <Link href='/'>
          <a>
            <span className='main-title'>Hacker Next</span>
          </a>
        </Link>
      </nav>
      {children}
    </div>
    <style jsx>{`
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: #f6f6ef;
      }
      nav {
        background: #f60;
        padding: 1em;
      }

      nav > * {
        display: inline-block;
        color: black;
      }

      nav a {
        text-decoration: none;
      }

      nav .main-title {
        font-weight: bold;
      }
    `}</style>
    <style global jsx>{`
      background: white;
      font-family: Verdana, Geneva, sans-serif;
    `}</style>
  </div>
);
