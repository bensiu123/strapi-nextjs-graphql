import { useApp } from "@/context/AppContext";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import { Nav, NavItem, Container } from "reactstrap";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { title = "Strapi Next.js GraphQL food ordering app", children } =
    props;

  const { user, logout } = useApp();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script src="https://js.stripe.com/v3" />
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/" className="navbar-brand">
              Home
            </Link>
          </NavItem>

          <NavItem>
            {user ? (
              <h5 className="text-primary">{user.username}</h5>
            ) : (
              <Link href="/register" className="nav-link">
                Sign Up
              </Link>
            )}
          </NavItem>

          <NavItem className="ml-auto">
            {user ? (
              <Link href="/" onClick={logout}>
                Logout
              </Link>
            ) : (
              <Link href="/login" className="nav-link">
                Sign In
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
