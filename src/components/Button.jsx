import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick, className, link1, link1Name, link2, link2Name, name }) {
  const base = "inline-block rounded-full font-semibold tracking-wide transition-colors duration-300   disabled:cursor-not-allowed";

  const styles = {
    primary: base + ` px-4 py-2 md:px-6 bg-blue-color-light text-white  ${className}`,

    secondry: base + ` px-4 py-2 md:px-6 bg-white text-blue-color-light hover:bg-stone-100 ${className}`,

    bordered: base + ` px-[10px] py-[6px] md:px-5 border-2 ${className}`,

    customized: `${className}`,

    simple: "text-sm font-semibold px-[12px] py-[8px] bg-blue-color-light text-white rounded-md min-w-[140px]",
  };

  if (to) {
    return (
      <Link to={to} className={`block ${styles[type]}`}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  if (link1 && link2) {
    return (
      <button
        className="w-60 h-[36px] 2xl:h-12 flex 2xl:text-[14px] text-[12px] font-semibold tracking-wide text-center text-white rounded-full before:content-[''] before:w-0.5 before:h-5 before:bg-white before:right-[120px] before:top-[8px] 2xl:before:right-[121px] 2xl:before:top-[14px] before:relative bg-blue-color-light disabled:cursor-not-allowed"
        aria-label={name}
      >
        <div className="flex justify-center items-center  w-60 h-[36px] 2xl:h-12 transition-colors duration-300 rounded-full ">
          <Link to={link1}>{link1Name}</Link>
        </div>

        <div className="flex justify-center items-center  w-60 h-[36px] 2xl:h-12 transition-colors duration-300 rounded-full  ">
          <Link to={link2}>{link2Name}</Link>
        </div>
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
