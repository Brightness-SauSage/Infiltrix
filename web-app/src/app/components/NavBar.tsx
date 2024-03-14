// components/NavBar.tsx

export const NavBar = () => {
  return (
    <div className="navBar">
      <div className="navContainer">
        <div className="logo">Infiltrix</div>

        <nav>
          
          <ul className="hidden md:flex md:items-center">
            <li className="navLi"><a href="#">Home</a></li>
            <li className="navLi"><a href="#">About</a></li>
            <li className="navLi"><a href="#">Contact</a></li>
          </ul>
        </nav>

        <div className="pr-20">
          <div className="btn">Contact Us</div>
        </div>
      </div>
    </div>
  );
};
