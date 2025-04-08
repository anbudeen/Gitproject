/// <reference types='cypress' />

import "cypress-file-upload"

describe("ECOMMERCE -test suite",()=>{
    it("verify Register User",()=>{

        cy.visit("http://automationexercise.com")

        cy.wait(5000); // Waits 5 seconds before searching
       // cy.contains('Website for practice automation').should('be.visible');


        cy.get("img[alt='Website for automation practice']",{timeout: 4000}).should('have.attr', 'src').then((src) => {
            expect(src).to.not.be.empty;
          });  ///Verify that home page is visible successfully

          cy.clicklinks(" Signup / Login")  //  click on sign in

          cy.get("div[class='signup-form'] h2").should("have.text","New User Signup!")  /// Verify 'New User Signup!' is visible

          // Enter name and email address
           cy.fixture("usersignupdate.json").then((userdata)=>{

          // cy.visit("https://www.automationexercise.com/login")
            const userreg=userdata[Math.floor(Math.random() * userdata.length)]

           // const userreg=userdata[Math.floor(Math.random() .toString(5).substring(3))]

            cy.get("input[placeholder='Name']").clear().type(userreg.Name)
            cy.get("input[data-qa='signup-email']").clear().type(userreg.EmailAddress)
            cy.get("button[data-qa='signup-button']").click() //Click 'Signup' button

            //Verify that 'ENTER ACCOUNT INFORMATION' is visible

            cy.xpath("//b[normalize-space()='Enter Account Information']",{timeout:3000}).should("have.text","Enter Account Information")

             // Fill details: Title, Name, Email, Password, Date of birth


             //cy.get("div[class='login-form'] form").should("have.text","Title")

             cy.get("#id_gender2").should('be.visible')

             cy.get("#id_gender2").check().should("be.checked") //title

             cy.get("#password").clear().type(userreg.Password)//password

             //cy.get("#days").click() 
             cy.get("select#days").select(userreg.Date).should('have.value',userreg.Date)
             cy.get("select#months").select(userreg.Month).should('have.value',4)
             cy.get("select#years").select(userreg.Year).should('have.value',userreg.Year)

             //Select checkbox 'Sign up for our newsletter!'

             cy.get("#newsletter").check().should("be.checked");
             //Select checkbox 'Receive special offers from our partners!'
             cy.get("#optin").check().should("be.checked")

             //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number

             cy.fixture("addressinformation.json").then((addrdata)=>{

              //const addressdata=addrdata

              cy.get("#first_name").clear().should('exist').and('be.visible').type(addrdata.firstname)
              cy.get("#last_name").clear().should('exist').and('be.visible').type(addrdata.lastname)
              cy.get("#company").clear().should('exist').and('be.visible').type(addrdata.company)
              cy.get("#address1").clear().should('exist').and('be.visible').type(addrdata.address1)
              cy.get("#address2").clear().should('exist').and('be.visible').type(addrdata.address2)
              cy.get("#country").select(addrdata.country).should('have.value',"United States")
              cy.get("#state").clear().should('exist').and('be.visible').type(addrdata.state)
              cy.get("#city").clear().should('exist').and('be.visible').type(addrdata.city)
              cy.get("#zipcode").clear().should('exist').and('be.visible').type(addrdata.zipcode)
              cy.get("#mobile_number").clear().should('exist').and('be.visible').type(addrdata.mobileNumber)

              //Click 'Create Account button'

              cy.get("button[data-qa='create-account']").click()

             })


             // Verify that 'ACCOUNT CREATED!' is visible



             cy.get("h2[class='title text-center'] b").should("have.text","Account Created!")

             //Click 'Continue' button


             cy.get('[data-qa="continue-button"]').click()

             //Verify that 'Logged in as username' is visible { timeout: 10000 }

             //cy.xpath("//b[normalize-space()='test2233']",{ timeout: 10000 }).should('be.visible').should('contain',' Logged in as '+userreg.Name)

             //cy.contains(' Logged in as', userreg.Name, { timeout: 10000 }).should('be.visible');

             cy.contains('Logged in as', { timeout: 10000 }).should('exist');
             cy.contains('Logged in as').should('contain', userreg.Name);

          })

          //Click 'Delete Account' button

          cy.clicklinks("Delete Account") 
          
        cy.get("h2[class='title text-center'] b").should("have.text","Account Deleted!")

        cy.clicklinks("Continue")
          
    })


    it("Test Case 2: Login User with correct email and password",()=>{

      cy.visit("http://automationexercise.com")

      cy.get("img[alt='Website for automation practice']",{timeout: 4000}).should('have.attr', 'src').then((src) => {
        expect(src).to.not.be.empty;
 });  ///Verify that home page is visible successfully

      cy.clicklinks(" Signup / Login")  //  click on sign in

      cy.get("div[class='login-form'] h2").should("have.text","Login to your account")//. Verify 'Login to your account' is visible
      

      // Enter correct email address and password

      cy.fixture("Loginuser.json").then((userlogin)=>{
        cy.get("input[data-qa='login-email']").clear().should('exist').and('be.visible').type(userlogin.EmailAddress)
        cy.get("input[placeholder='Password']").clear().should('exist').and('be.visible').type(userlogin.Password)
        cy.get("button[data-qa='login-button']").click()

        //Verify that 'Logged in as username' is visible

        cy.contains('Logged in as', { timeout: 10000 }).should('exist');
        cy.contains('Logged in as').should('contain', userlogin.Name);


      })


    })


    it("Test Case 3: Login User with incorrect email and password",()=>{

      cy.visit("http://automationexercise.com")

      cy.get("img[alt='Website for automation practice']",{timeout: 4000}).should('have.attr', 'src').then((src) => {
        expect(src).to.not.be.empty;
      })///Verify that home page is visible successfully

      cy.clicklinks(" Signup / Login")  //  click on sign in

      cy.get("div[class='login-form'] h2").should("have.text","Login to your account")//. Verify 'Login to your account' is visible
      

      //Enter incorrect email address and password

      cy.fixture("usersignupdate.json").then((userloginincorrect)=>{

        const incorrectlogin=userloginincorrect[Math.floor(Math.random() * userloginincorrect.length)]
        cy.get("input[data-qa='login-email']").clear().should('exist').and('be.visible').type(incorrectlogin.EmailAddress)
        cy.get("input[placeholder='Password']").clear().should('exist').and('be.visible').type(incorrectlogin.Password)

        // Click 'login' button
        cy.get("button[data-qa='login-button']").click() 

        // Verify error 'Your email or password is incorrect!' is visible
        cy.get("body > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(2) > p:nth-child(4)").should("have.text","Your email or password is incorrect!")


    })

  })

  it("Test Case 4: Logout User",()=>{

    cy.visit("http://automationexercise.com")

    cy.get("img[alt='Website for automation practice']",{timeout: 4000}).should('have.attr', 'src').then((src) => {
      expect(src).to.not.be.empty;
});  ///Verify that home page is visible successfully

    cy.clicklinks(" Signup / Login")  //  click on sign in

    cy.get("div[class='login-form'] h2").should("have.text","Login to your account")//. Verify 'Login to your account' is visible
    

    // Enter correct email address and password

    cy.fixture("Loginuser.json").then((userlogin)=>{
      cy.get("input[data-qa='login-email']").clear().should('exist').and('be.visible').type(userlogin.EmailAddress)
      cy.get("input[placeholder='Password']").clear().should('exist').and('be.visible').type(userlogin.Password)
      cy.get("button[data-qa='login-button']").click()

      //Verify that 'Logged in as username' is visible

      cy.contains('Logged in as', { timeout: 10000 }).should('exist');
      cy.contains('Logged in as').should('contain', userlogin.Name);

//. Click 'Logout' button
      cy.clicklinks("Logout")

      //Verify that user is navigated to login page

      cy.url().should("include", "/login");

      cy.get("div[class='login-form'] h2").should("have.text","Login to your account")


    })

  })


    it("Test Case 5: Register User with existing email",()=>{

      cy.visit("http://automationexercise.com")

      cy.get("img[alt='Website for automation practice']",{timeout: 4000}).should('have.attr', 'src').then((src) => {
        expect(src).to.not.be.empty;
      })///Verify that home page is visible successfully

      cy.clicklinks(" Signup / Login")  //  click on sign in

      cy.get("div[class='login-form'] h2").should("have.text","Login to your account")//. Verify 'Login to your account' is visible
      

      //Enter name and already registered email address

      cy.fixture("Loginuser.json").then((userlogin)=>{
        cy.get("input[placeholder='Name']").clear().type(userlogin.Name)
        cy.get("input[data-qa='signup-email']").clear().type(userlogin.EmailAddress)
        cy.get("button[data-qa='signup-button']").click() //Click 'Signup' button
      

        //  Verify error 'Email Address already exist!' is visible
        cy.get("body > section:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > form:nth-child(2) > p:nth-child(5)").should("have.text","Email Address already exist!")


    })

  })
  it.only("Test Case 6: Contact Us Form",()=>{

    cy.visit("http://automationexercise.com")

    cy.wait(5000)
    cy.get("img[alt='Website for automation practice']",{timeout: 4000}).should('have.attr', 'src').then((src) => {
      expect(src).to.not.be.empty;
});  ///Verify that home page is visible successfully

//Click on 'Contact Us' button
cy.clicklinks(" Contact us")
//Verify 'GET IN TOUCH' is visible
cy.get("div[class='contact-form'] h2[class='title text-center']").should("have.text","Get In Touch")

// Enter name, email, subject and message

cy.fixture("getintouch.json").then((getindata)=>{

  const getdata=getindata[Math.floor(Math.random() * getindata.length)]

  cy.get("input[placeholder='Name']").clear().should('exist').and('be.visible').type(getdata.Name)
      cy.get("input[placeholder='Email']").clear().should('exist').and('be.visible').type(getdata.Email)
      cy.get("input[placeholder='Subject']").clear().should('exist').and('be.visible').type(getdata.Subject)
      cy.get("#message").clear().should('exist').and('be.visible').type(getdata.YourMessageHere)

    })
      
      //Upload file

      cy.get("input[name='upload_file']").attachFile("uploadcypresspom.txt")
      cy.wait(6000)
      cy.get("input[value='Submit']").click()

      cy.on("window:confirm",(confirmtest)=>{
            expect(confirmtest).to.contain("Press OK to proceed!")
            
        })
        // Verify success message 'Success! Your details have been submitted successfully.' is visible
        cy.get(".status.alert.alert-success")
        .should('be.visible') // Check if the element is visible
        .should('contain', 'Success! Your details have been submitted successfully.'); // Check text
        //Click 'Home' button and verify that landed to home page successfully

        cy.get("a[class='btn btn-success'] span").click()
       
        cy.url().should("contain", "automationexercise.com");


  })

})


