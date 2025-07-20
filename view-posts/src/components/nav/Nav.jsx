const Nav = () => {
  return (
    <nav>
      <h1>Navigation</h1>
      <ul>
        <li>
          <Link to="/posts">PLOG</Link>
        </li>
        <li>
          <Link to="/user">USER</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
