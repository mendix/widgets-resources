import type { NextPage } from "next";
import { ContentGrid } from "../components/ContentGrid/ContentGrid";
import { z } from "zod";
import {
    ContentPackageSchema,
    ContentSchema,
    JSActionSchema,
    OutputSchema,
    TestsSchema,
    WidgetRequirementsSchema,
    WidgetSchema
} from "../schema";
import { Container, Row } from "react-bootstrap";
import { useMemo } from "react";

type Props = {
    data: z.infer<typeof OutputSchema>;
};

export type Row = Partial<Omit<z.infer<typeof WidgetSchema>, "requirements" | "tests">> &
    Partial<z.infer<typeof JSActionSchema>> &
    Partial<z.infer<typeof WidgetRequirementsSchema>> &
    Partial<z.infer<typeof TestsSchema>> &
    Pick<z.infer<typeof ContentPackageSchema>, "version"> &
    z.infer<typeof ContentSchema> & { type: "widget" | "jsAction" };

const Home: NextPage<Props> = props => {
    const rows = useMemo<Row[]>(
        () => [
            ...props.data.jsActionPackages.flatMap<Row>(jsActionPackage =>
                jsActionPackage.items.map(jsAction => ({
                    ...jsAction,
                    type: "jsAction",
                    version: jsActionPackage.version
                }))
            ),
            ...props.data.widgetPackages.flatMap<Row>(widgetPackage =>
                widgetPackage.items.map(widget => {
                    const { requirements, tests, ...rest } = widget;
                    return {
                        ...rest,
                        ...requirements,
                        ...tests,
                        type: "widget",
                        version: widgetPackage.version
                    };
                })
            )
        ],
        [props.data]
    );

    return (
        <Container className="vh-100" fluid>
            <div className="d-flex flex-column h-100">
                <Row>
                    <h1>Content Overview</h1>
                </Row>
                <ContentGrid rows={rows} />
            </div>
        </Container>
    );
};

export default Home;

export async function getStaticProps() {
    return {
        props: {
            data: OutputSchema.parse(await import("../../../data/content.json"))
        }
    };
}
