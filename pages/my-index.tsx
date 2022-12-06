import { GetStaticProps, NextPage } from "next";

type Props = {
  testData: string;
};

const TestIndexPage: NextPage<Props> = (props) => {
  return (
    <div className="container">
      <div>/index route uses pages/my-index.tsx</div>
      <div>{props.testData}</div>
    </div>
  );
};

export default TestIndexPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      testData: "This is a test data",
    },
  };
};
