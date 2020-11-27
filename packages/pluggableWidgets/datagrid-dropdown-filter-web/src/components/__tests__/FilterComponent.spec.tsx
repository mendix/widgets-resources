// import { shallow } from "enzyme";
// import { createElement } from "react";
// import { FilterComponent } from "../FilterComponent";
//
// jest.useFakeTimers();
//
// describe("Filter selector", () => {
//     it("renders correctly", () => {
//         const component = shallow(
//             <FilterComponent filterDispatcher={jest.fn()} />
//         );
//
//         expect(component).toMatchSnapshot();
//     });
//
//     it("renders correctly with ariaLabel", () => {
//         const component = shallow(
//             <FilterComponent ariaLabel="my label" filterDispatcher={jest.fn()} />
//         );
//
//         expect(component).toMatchSnapshot();
//     });
//
//     it("calls filterDispatcher when value changes", () => {
//         const filterDispatcher = jest.fn();
//         const component = shallow(
//             <FilterComponent filterDispatcher={filterDispatcher} />
//         );
//
//         const input = component.find("input");
//         input.simulate("change", { target: { value: "test" } });
//
//         expect(filterDispatcher).toBeCalled();
//     });
//
//     it("debounces calls for filterDispatcher when value changes", () => {
//         const filterDispatcher = jest.fn();
//         const component = shallow(
//             <FilterComponent filterDispatcher={filterDispatcher} />
//         );
//
//         // Initial call with default filter
//         expect(filterDispatcher).toBeCalledTimes(1);
//
//         const input = component.find("input");
//         input.simulate("change", { target: { value: "test" } });
//         jest.advanceTimersByTime(499);
//         input.simulate("change", { target: { value: "test2" } });
//         input.simulate("change", { target: { value: "test3" } });
//         jest.advanceTimersByTime(500);
//
//         expect(filterDispatcher).toBeCalledTimes(2);
//
//         input.simulate("change", { target: { value: "test" } });
//         jest.advanceTimersByTime(500);
//
//         expect(filterDispatcher).toBeCalledTimes(3);
//     });
// });
