import { shallow } from "enzyme";
import { DOM, createElement } from "react";

describe("Rating", () => {

   it("renders the structure correctly", () => {
      //
    });

    it("creates a rating", () => {
      //
    });

    it("sets the rating value", () => {
      //
    });

    it("updates the rating value when the values are changed", () => {
       
    });

    describe ("should render as readonly", () => {
        it("when show total is false", () => {
            //
        });

        it("when user is not vote owner", () => {

        });

    });

    describe("with step", () => {
        it("not specified renders empty ui", () => {
           //
        });

        it("stop  equal or less than 0 shows invalid", () => {
           //
        });

        it("less than 0 show empty ui", () => {
          
        });

        it("greater than the maximum show maximum", () => {
            //
        });
    });   
       

    describe("color", () => {
        it("should be red color is red", () => {
            // Fix me
        });
        it("should not be red when color not red", () => {
            // Fix me
        })
    });

    describe("symbol", () => {
        it("should be star if set style is star", () => {
           // Fix me
        });

        it("should not be star if set style is not star", () => {
            // Fix me
        });
    });

    describe("with an onClick microflow set", () => {
        it("executes the microflow when a rating is clicked", () => {
           //
        });

        it("microflow selected it shows an error in configuration", () => {
          //
        });

        it("invalid microflow shows an error when a rating is clicked", () => {
            //
        });
    });

    describe("with an onClick show page set", () => {
        it("opens the page when a rating is clicked", () => {
           //
        });

        it("without a page selected it shows an error in configuration", () => {
           //
        });
    });

    describe("without a on click", () => {
        it("should not respond on user click", () => {
           //
        });
    });

});