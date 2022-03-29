// function contactForm() {
//   return {
//     formData: {
//       name: "",
//       email: "",
//       phone: "",
//       message: "",
//     },
//     message: "",

//     loading: false,
//     buttonLabel: 'Submit',

//     submitData() {
//       this.buttonLabel = 'Submitting...'
//       this.loading = true;
//       this.message = ''
//           // this.message = ''
//       fetch("https://at.12-36.com/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           base: "appjsgXEmliyeIbSw",
//           table: "Leads",
//           fields: {
//             Email: this.formData.email,
//             Name: this.formData.name,
//             Message: this.formData.message,
//             Site: "Launchist",
//             Phone: this.formData.phone,
//           },
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           loading = false;
//           showAlertMessage = false;
//           showSuccessMessage = true;
//           name = "";
//           email = "";
//           message = "";
//           phone = "";
//         });
//     },
//   };
// }
// document.addEventListener("alpine:init", () => {
//   Alpine.data("contactForm", () => ({
//     formData: {
//       name: "",
//       email: "",
//       message: "",
//     },
//     message: "",
//     buttonLabel: "Submit",

//     submitData() {
//       this.message = "";

//       fetch("/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(this.formData),
//       })
//         .then(() => {
//           this.message = "Form sucessfully submitted!";
//         })
//         .catch(() => {
//           this.message = "Ooops! Something went wrong!";
//         });
//     },
//   }));
// });

// function contactForm() {
//   return {
//     formData: {
//       name: "",
//       email: "",
//       message: "",
//     },
//     message: "",
//     buttonLabel: "Submit",

//     submitData() {
//       this.message = "";

//       fetch("/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(this.formData),
//       })
//         .then(() => {
//           this.message = "Form sucessfully submitted!";
//         })
//         .catch(() => {
//           this.message = "Ooops! Something went wrong!";
//         });
//     },
//   };
// }
function hello() {
  return {
    title: "Hello Alpine",
  };
}

function sourceData() {
  return [
    {
      id: "1",
      employee_name: "Tiger Nixon",
      employee_salary: "320800",
      employee_age: "61",
      profile_image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      employee_name: "Garrett Winters",
      employee_salary: "170750",
      employee_age: "63",
      profile_image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "3",
      employee_name: "Ashton Cox",
      employee_salary: "86000",
      employee_age: "66",
      profile_image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];
}
