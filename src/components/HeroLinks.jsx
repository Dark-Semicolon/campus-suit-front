import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HeroLinks({ separator = "/", pages, isHero = false }) {
  return (
    <Breadcrumbs
      maxItems={4}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={3}
      aria-label="breadcrumb"
      separator={separator}
      sx={{
        "& .MuiBreadcrumbs-ol": {
          "& .MuiBreadcrumbs-separator": {
            color: `${isHero ? "#fff" : "#2a2a2a"}`,
          },
        },
      }}
    >
      {pages.slice(1).map((page) => {
        return (
          <Link
            key={page.name}
            underline="hover"
            className={`${isHero ? "text-gray-color-light" : "text-gray-600"}`}
            to={page.link}
            color="#fff"
          >
            {page.name}
          </Link>
        );
      })}
      <Typography className="text-yellow-color-primary">
        {pages[0].name}
      </Typography>
    </Breadcrumbs>
  );
}
