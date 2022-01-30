import type { NextPage } from "next";
import { WidgetsGrid } from "../components/WidgetsGrid/WidgetsGrid";
import { z } from "zod";
import { OutputSchema } from "../schema";
import { Container, Nav, Row, Tab } from "react-bootstrap";
import { JSActionsGrid } from "../components/JSActionsGrid/JSActionsGrid";

type Props = {
    data: z.infer<typeof OutputSchema>;
};

const Home: NextPage<Props> = props => {
    return (
        <Container className="vh-100" fluid>
            <div className="d-flex flex-column h-100">
                <Row>
                    <h1>Content Overview</h1>
                </Row>
                <Tab.Container defaultActiveKey="widgets">
                    <Row>
                        <Nav variant="tabs" className="nav-fill">
                            <Nav.Item>
                                <Nav.Link eventKey="widgets">Widgets</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="jsActions">JS Actions</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>
                    <Row className="flex-grow-1">
                        <Tab.Content className="h-100">
                            <Tab.Pane eventKey="widgets" className="h-100">
                                <WidgetsGrid data={props.data.widgetPackages} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="jsActions" className="h-100">
                                <JSActionsGrid data={props.data.jsActionPackages} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
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
