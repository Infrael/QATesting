/// <reference types="cypress" />

describe('Cypress Testų Scenarijai', () => {
  // Prieš kiekvieną testą atidaro pagrindinį puslapį
  beforeEach(() => {
    cy.visit('/index.html');
  });



  describe('1. Pagrindinio puslapio testas', () => {
    it('Patikrina, ar banner yra matomas ir mygtuko paspaudimas pakeičia URL', () => {
      // Patikrina ar banner yra matomas ir ar turi pasveikinimo tekstą
      cy.get('#section-basic .banner')
        .should('be.visible')
        .and('contain.text', 'Sveiki atvykę į Cypress testų puslapį!');

      // Gauname alert pranešimą ir patikriname jo tekstą
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Navigacija į /commands/actions atlikta!');
      });

      // Paspaudžiame mygtuką "užkrauti"
      cy.get('#action-type').click();

      // Patikriname, ar URL įtraukia "/commands/actions"
      cy.url().should('include', '/commands/actions');
    });
  });

  describe('2. Prisijungimo formos testas', () => {
    it('Užpildo formą ir rodo sveikinimo žinutę bei profilio informaciją', () => {
      // Sukuriame kintamuosius vartotojo vardui ir slaptažodžiui
      const username = 'TestUser';
      const password = 'Abuser';

      // Įrašome sukurtus kintamuosius
      cy.get("#username").type(username);
      cy.get("#password").type(password);

      // Spaudžiame mygtuką "Prisijungti"
      cy.get("#login-button").click();

      // Patikriname, ar rodoma sveikinimo žinutė
      cy.get("#greeting").should('be.visible').and('contain.text', `Sveiki, ${username}`);

      // Patikriname, ar rodomas studento profilis
      cy.get("#profile").should('be.visible').and('contain.text', 'Studento profilis');
    });
  });

  describe('3. Dinaminių elementų testas', () => {
    it('Patikrina, ar visi sąrašo elementai turi žodį "Item"', () => {
      // Parenkame sąrašą ir ciklu per jį pereiname
      cy.get('#item-list').each(($el) => {
        cy.wrap($el)
          .should('contain.text', 'Item')
          .invoke('text')
          .then((text) => cy.log(text));
      });
    });
  });

    describe('4. API užklausų testas', () => {
      it('Stubina API užklausą ir rodo stubinimo duomenis', () => {
        // Paruoštas stubintas atsakymas iš data.json failo
        // Interceptuojame GET užklausą į data.json
        cy.fixture('data.json').then((data) => {
          cy.intercept('GET', 'data.json', {
            statusCode: 200,
            body: data,
          }).as('getData');
        });
         
        // Paspaudžiame mygtuką "Gauti duomenis"
        cy.get('#fetch-data').click();

        // Laukiame, kol užklausa bus atlikta
        // Patikriname, ar .data-container elemente rodomi stubinto atsakymo duomenys
        cy.wait('@getData').its('response.body.message').should('eq', 'Stub data');
      });
    });


    describe('5. Asinchroninės operacijos testas', () => {
      it('Patikrina, ar asinchroninė operacija baigiasi teisingai', () => {
        cy.clock(); // ⏸️ Freeze timers

        // Paspaudžiame mygtuką "Paleisti asinchroninę operaciją"
        cy.get('#async-action').click();

        // Patikriname ar iškart po paspaudimo rodomas pranešimas 'Operacija prasidėjo...'
        cy.get('#async-result').should('be.visible').and('contain.text', 'Operacija prasidėjo...');

        // Laukiame, kol asinchroninė operacija baigsis (naudojame šiek tiek ilgesnį timeout), patikriname ar rodomas pranešimas 'Asinchroninė operacija baigta!'
        cy.tick(3000); // ⏭️ Fast forward timers
        cy.get('#async-result').should('have.text', 'Asinchroninė operacija baigta!');
      });
    });

    describe('6. Hover efekto testas', () => {
      it('Rodo tooltip, kai užvedama pele ant hover-box', () => {
        // Iš pradžių tooltip neturėtų būti matomas
        cy.get('#tooltip').should('not.be.visible');

        // Simuliuojame pelės užvedimą ant elemento ir patikriname ar rodomas pranešimas 'Papildoma informacija'
        cy.get('#hover-box').trigger('mouseover');
        cy.get('#tooltip').should('be.visible').and('contain.text', 'Papildoma informacija');

        // Simuliuojame pelės nuvedimą nuo elemento ir patikriname ar tooltip jau nėra matomas
        cy.get('#hover-box').trigger('mouseout');
        cy.get('#tooltip').should('not.be.visible');
      });
    });
  });