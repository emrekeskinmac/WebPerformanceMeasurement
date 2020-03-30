import * as React from "react";
import { colors, Grid, Card, Form } from "tabler-react";
import C3Chart from "react-c3js";
import PageContent from "../components/molecules/PageContent";
import useAxios from 'axios-hooks'

const Home: React.FC<{}> = () => {
  const [{ data, loading }] = useAxios('https://127.0.0.1:3000/collect')


  if (loading) return <> Loading... </>;
  
  let chart = {
    ttfb: {
      columns: !loading ? [["data1", ...data.map(e => parseInt(e.ttfb))]] : [],
      type: "line",
      colors: { data1: colors.orange, },
      names: { data1: "TTFB (ms)" },
    },
    dload: {
      columns: !loading ? [["data1", ...data.map(e => parseInt(e.dload))]] : [],
      type: "line",
      colors: { data1: colors.red, },
      names: { data1: "Dom Load (ms)" },
    },
    fcb: {
      columns: !loading ? [["data1", ...data.map(e => parseInt(e.paint))]] : [],
      type: "line",
      colors: { data1: colors.green, },
      names: { data1: "FCB (ms)" },
    },
    load: {
      columns: !loading ? [["data1", ...data.map(e => parseInt(e.load))]] : [],
      type: "line",
      colors: { data1: colors.blue, },
      names: { data1: "Window Load (ms)" },
    },
    axis: {
      x: {
        type: 'category',
        categories: !loading && data.map(e => e._id),
        show: true,
      },
    },
  };
  return (
    <PageContent>
      <Grid.Row>
        <Grid.Col md={6} xl={6}>
          <Card title={"TTFB"}>
            <Card.Body>
              <C3Chart
                data={chart.ttfb}
                axis={chart.axis}
                padding={{
                  bottom: 0,
                  top: 0,
                }}
              />
            </Card.Body>
          </Card>
        </Grid.Col>
        <Grid.Col md={6} xl={6}>
          <Card title={"Dom Load"}>
            <Card.Body>
              <C3Chart
                data={chart.dload}
                axis={chart.axis}
                padding={{
                  bottom: 0,
                  top: 0,
                }}
              />
            </Card.Body>
          </Card>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col md={6} xl={6}>
          <Card title={"FCB"}>
            <Card.Body>
              <C3Chart
                data={chart.fcb}
                axis={chart.axis}
                padding={{
                  bottom: 0,
                  top: 0,
                }}
              />
            </Card.Body>
          </Card>
        </Grid.Col>
        <Grid.Col md={6} xl={6}>
          <Card title={"Window Load"}>
            <Card.Body>
              <C3Chart
                data={chart.load}
                axis={chart.axis}
                padding={{
                  bottom: 0,
                  top: 0,
                }}
              />
            </Card.Body>
          </Card>
        </Grid.Col>
      </Grid.Row>
    </PageContent>
  );
};

Home.displayName = 'Home';

export default Home;
