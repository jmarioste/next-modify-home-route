import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

type Props = {
  slug: string;
};
const SlugPage = ({ slug }: Props) => {
  return <div>{slug}</div>;
};

export default SlugPage;
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug as string;
  console.log("inside [...slug] getStaticProps", slug);

  return {
    props: { slug: slug },
  };
};
