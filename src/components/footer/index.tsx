import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="border-t text-white/60 glass-dark border-x-0! padding-x padding-y text-center">
      Tüm Hakları Saklıdır. &copy; CarHub {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
