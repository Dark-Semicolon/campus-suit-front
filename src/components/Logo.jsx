import { Image } from "@nextui-org/react";

function Logo({ width = "200", logo = "/images/logo/logo-blue.svg" }) {
  return (
    <div className="w-fit">
      <Image src={logo} alt="website Logo" width={width} height={"auto"} loading="lazy" decoding="async" />
    </div>
  );
}

export default Logo;
