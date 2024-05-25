document.getElementById("Registration").addEventListener("submit",async(e)=>
{
  e.preventDefault();
  const fdata={
    name:document.getElementById("username").value,
    email:document.getElementById("email").value,
    password:document.getElementById("password").value,
  }
  try {
    const res=await fetch("http://localhost:3000/submit_registration",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(fdata)
    })
    const resData = await res.json();

    if (resData.success) {
      alert(resData.message);
      document.getElementById("Registration").reset();
    } else {
      alert(resData.message);
    }
  } catch (error) {
    alert("An error occurred. Please try again.");
  
  }
})
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('Registration');
  form.addEventListener('submit', function (event) {
      const emailInput = document.getElementById('email');
      const email = emailInput.value;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(email)) {
          alert('Please enter a valid email address.');
          event.preventDefault(); // Prevent form submission
      }
  });
});
