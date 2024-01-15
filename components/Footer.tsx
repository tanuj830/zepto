import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Footer = () => {
  return (
    <div className="text-white absolute bottom-4 left-[43%]">
      <h6>
        Made with <span className="text-xl text-red-600">♥</span> -{" "}
        <Link href="https://tanujbhatt.in" className="underline animate-bounce">
          tanujbhatt.in
        </Link>
      </h6>
    </div>
  );
};

export default Footer;
