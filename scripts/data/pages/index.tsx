import type { NextPage } from "next";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { WidgetsGrid } from "../components/WidgetsGrid";
import { z } from "zod";
import { OutputSchema } from "../schema";

type Props = {
    data: z.infer<typeof OutputSchema>;
};

const Home: NextPage<Props> = props => {
    return (
        <Container className="vh-100" fluid>
            <Row className="h-100">
                <Col className="h-100">
                    <h1>Content Overview</h1>
                    <Tab.Container defaultActiveKey="widgets">
                        <Nav variant="tabs" className="nav-fill">
                            <Nav.Item>
                                <Nav.Link eventKey="widgets">Widgets</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="jsActions">JS Actions</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="h-100">
                            <Tab.Pane eventKey="widgets" className="h-100">
                                <WidgetsGrid data={props.data.widgetPackages} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="jsActions" className="h-100" />
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;

export async function getStaticProps() {
    // @ts-ignore
    const data = await import("../../../data/content.json");
    return {
        props: {
            data: OutputSchema.parse(data)
        }
    };
}
