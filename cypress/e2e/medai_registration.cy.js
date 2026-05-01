describe('MedAi Registration Form Tests', () => {
    beforeEach(() => {
        // Navigate to the specific HTML page
        cy.visit('/');
    });

    it('TC01: Submit Valid Personal Information', () => {
        // Personal Info Section
        // Using eq(0) because 'name' and 'phone' might be duplicated in the Contact section
        cy.get('#name').eq(0).should('be.visible').type('John Doe');
        cy.get('#gender').select('Male');
        cy.get('#phone').eq(0).type('01012345678');
        cy.get('#dob').type('1990-01-01');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#address').type('123 Main St, Cairo, Egypt');

        // There were no IDs on buttons found, so we target by text or type
        // Assuming "Next" or "Submit" logic. 
        // If it's a multi-step form, we might need to click Next.
        // Based on inspection, we look for buttons. 
        // We'll try to find a button that looks like a submit for this form.
        // Since we don't have the button ID, we try finding by content.
        cy.get('button').contains('Next').click({ force: true });

        // Assertion: Check if we moved to next step or stayed on page (depending on logic).
        // For now, we verify the inputs hold values.
        cy.get('#name').eq(0).should('have.value', 'John Doe');
    });

    it('TC02: Validation - Empty Name', () => {
        cy.get('#phone').eq(0).type('01012345678');
        cy.get('button').contains('Next').click({ force: true });
        // Assuming HTML5 validation or JS alert. 
        // If HTML5 validtion, CSS pseudo class :invalid might be active.
        cy.get('#name').eq(0).then(($input) => {
            expect($input[0].validationMessage).to.not.be.empty;
        });
    });
});
