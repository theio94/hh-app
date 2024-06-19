const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnh2dG9zemZrampzZ2p1bmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4OTUwMjcsImV4cCI6MjAzMzQ3MTAyN30.k7AXh6OBtYhWhAXX4EkhxACiFe9-xTn9UFKzdOCfSZA"

const url = "https://olbxvtoszfkjjsgjunbf.supabase.co"

const database = supabase.createClient(url,key,{
    db:{
        schema:"public"
    }
})

document.addEventListener('click', async ()=> {
    var signUpForm = document.getElementById('sign-up'); // Find the sign-up form.
    signUpForm.onsubmit = signUpSubmitted.bind(signUpForm) // When the form is submitted, do the sign-up action.
  

})

const signUpSubmitted = (event) => {
    event.preventDefault(); // Stop the form from doing its usual thing.
    const email = event.target[1].value; // Get the email from the form.
    const password = event.target[2].value; // Get the password from the form.
    const name = event.target[0].value;

    if (name.length > 10){
        alert("Enter a name with 10 characters or less")
    }
    if(password.length > 12){
        alert("Enter a password with 8 - 12 characters")
    }
    if(email.length <=0){
        alert("Enter your email")
    }

    database.auth
      .signUp({data:{name}, email, password }) // Tell Supabase to sign up with the email and password.
      .then((response) => {
        response.error ? alert(response.error.message) : setToken(response); // If there's an error, show it. Otherwise, set the user token.
      })
      .catch((err) => {
        alert(err); // If something goes wrong, show an alert.
      });
  }
  
    function setToken(response) {
        if (response.user.confirmation_sent_at && !response?.session?.access_token) {
          alert('Confirmation Email Sent'); // If a confirmation email was sent but no access token, show this message.
        } else {
         alert('Logged in as ' + response.user.name); 
         window.open("/home.html")// Show an alert that the user is logged in.
        }
      }
      
  