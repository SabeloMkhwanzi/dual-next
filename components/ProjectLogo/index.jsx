import React from "react";
import { createStyles, Image } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function ProjectLogo() {
  const { classes } = useStyles();

  return (
    <Link style={{ color: "inherit", textDecoration: "inherit" }} href="/">
      <Image
        my={5}
        src="/duallogo1.png"
        alt="13"
        width={150}
        height={80}
        priority
        className={classes.links}
      />
    </Link>
  );
}
