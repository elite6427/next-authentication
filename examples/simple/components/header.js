import Link from "next/link";

const Header = (props) => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>

        <li>
          <Link href="/profile-ssr">
            <a>Profile SSR</a>
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              fetch("/api/logout")
                .then((response) => response.json())
                .then((js) => console.log("json", js))
                .catch((error) => console.log("error"));
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      ul {
        display: flex;
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }

      li {
        margin-right: 1rem;
      }

      li:first-child {
        margin-left: auto;
      }

      a {
        color: #fff;
        text-decoration: none;
      }

      header {
        padding: 0.2rem;
        color: #fff;
        background-color: #333;
      }
    `}</style>
  </header>
);

export default Header;
