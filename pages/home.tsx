import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <p>Home Page</p>
      <nav className="flex flex-col">
        <Link href="/" prefetch={false} className="link">
          Home
        </Link>
        <Link href="/index" prefetch={false} className="link">
          Index
        </Link>
        <Link href="/about" prefetch={false} className="link">
          About
        </Link>
        <Link href="/contact" prefetch={false} className="link">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
