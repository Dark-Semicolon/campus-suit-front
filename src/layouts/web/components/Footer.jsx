function Footer() {
  const links = [
    // { icon: "/images/footer/Telegram.png", name: "Telegram", link: "" },
    {
      icon: "/images/footer/Whatsapp.png",
      name: "Whatsapp",
      link: "https://wa.me/+201118451274",
    },
    {
      icon: "/images/footer/Tiktok.png",
      name: "tiktok",
      link: "https://www.tiktok.com/@biowithtawfik?_t=8hMeFPWnVh8&_r=1",
    },
    {
      icon: "/images/footer/Instagram.png",
      name: "instagram",
      link: "https://www.instagram.com/biowithtawfik?igsh=NHI2bjVhN3JtY29y",
    },
    // {
    //   icon: "/images/footer/Youtube.png",
    //   name: "youtube",
    //   link: "https://www.youtube.com/channel/UCc1bca1MnbWE2jr1K7gVPiw",
    // },
    {
      icon: "/images/footer/Facebook.png",
      name: "Facebook",
      link: "https://www.facebook.com/MrMohammadTawfeq",
    },
  ];

  return (
    <footer className="relative z-10">
      <img
        src="/images/footer/footerWave.svg"
        alt="footer wave design image"
        width="100%"
        loading="lazy"
        decoding="async"
      />
      <div className="flex flex-col justify-center items-center gap-4 w-100 bg-blue-color-dark h-[208px] py-10">
        <ul className="flex gap-1 md:gap-3">
          {links.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                target="_blank"
                aria-label={`${item.name} link`}
              >
                <img
                  src={item.icon}
                  className="w-10 md:w-full"
                  alt={`${item.name} link`}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </li>
          ))}
        </ul>
        <h2 className="text-sm text-white md:text-lg">
          {" "}
          منصة مستر محمد توفيق 2024 جميع الحقوق محفوظة &copy;
        </h2>
        <h3 className="text-sm text-white md:text-base">
          Developed by:{" "}
          <span className="text-blue-color-light">Darksemicolon</span>
        </h3>
      </div>
    </footer>
  );
}

export default Footer;
