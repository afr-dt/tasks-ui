import Link from 'next/link';
import { withRouter } from 'next/router';

const Header = ({ router: { pathname } }) => (
  <header>
    <Link prefetch href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
  </header>
);

export default withRouter(Header);
