import compareSnapshotCommand from "cypress-image-diff-js/dist/command";

compareSnapshotCommand();

Cypress.Commands.add("dragAndDrop", (subject, target, dragIndex, dropIndex) => {
    cy.get(subject).should("be.visible", { timeout: 20000 });
    Cypress.log({
        name: "DRAGNDROP",
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;
    cy.get(target)
        .eq(dropIndex)
        .then($target => {
            const coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .eq(dragIndex)
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger("mousedown", {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger("mousemove", {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .wait(1000);
                    cy.get("body")
                        .trigger("mousemove", {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true
                        })
                        .trigger("mouseup");
                });
        });
});
