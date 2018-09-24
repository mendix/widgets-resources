// import { mount, shallow } from "enzyme";
// import { createElement } from "react";

// import { Alert } from "../Alert";
// import { Signature, SignatureProps } from "../Signature";

// describe("Siganture", () => {
//     const renderCanvas = (props: SignatureProps) => shallow(createElement(Signature, props));
//     const fullRenderCanvas = (props: SignatureProps) => mount(createElement(Signature, props));

//     const defaultProps: SignatureProps = {
//         height: 500,
//         width: 500,
//         gridx: 50,
//         gridy: 50,
//         gridColor: "#777",
//         gridBorder: 1,
//         penColor: "#000",
//         maxLineWidth: 2.5,
//         minLineWidth: 0.5,
//         velocityFilterWeight: 0.7,
//         showGrid: true,
//         onClickAction: jasmine.any(Function),
//         alertMessage: ""
//     };

//     it("renders the structure correctly", () => {
//         const canvas = renderCanvas(defaultProps);

//         expect(canvas).toBeElement(
//             createElement("div",
//                 { className: "widget-Signature signature-unset" },
//                 createElement("canvas", {
//                     height: defaultProps.height,
//                     width: defaultProps.width,
//                     resize: true,
//                     style: { border: defaultProps.gridBorder + "px solid black" }
//                 }),
//                 createElement("button", {
//                     className: "btn btn-default",
//                     onClick: jasmine.createSpy("onClick")
//                 }),
//                 createElement("button", {
//                     className: "btn btn-primary",
//                     onClick: jasmine.any(Function),
//                     style: { visibility: "visible" }
//                 }),
//                 createElement(Alert, { bootstrapStyle: "danger" }, defaultProps.alertMessage)
//             )
//         );
//     });

//     it("renders grid while mounting", () => {
//         const signaturePad = fullRenderCanvas(defaultProps);
//         const signaturePadInstance = signaturePad.instance() as any;

//         const drawGrid = spyOn(signaturePadInstance, "drawGrid").and.callThrough();
//         signaturePadInstance.componentDidMount();

//         expect(drawGrid).toHaveBeenCalled();
//     });

//     xit("clears signature pad when reset is clicked", () => {
//         const signaturePad = fullRenderCanvas(defaultProps);

//         const signaturePadInstance = signaturePad.instance() as any;
//         const resetCanvas = spyOn(signaturePadInstance, "resetCanvas").and.callThrough();
//         signaturePad.find("button.btn.btn-default").first().simulate("click");

//         expect(resetCanvas).toHaveBeenCalled();
//     });
// });
