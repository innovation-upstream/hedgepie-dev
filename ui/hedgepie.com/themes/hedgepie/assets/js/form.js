function contactForm() {
  return {
    loading: false,
    showAlertMessage: false,
    showSuccessMessage: false,
    formData: {
      name: { value: "", errorMessage: "", blurred: false },
      email: { value: "", errorMessage: "", blurred: false },
      phone: { value: "", errorMessage: "", blurred: false },
      message: { value: "", errorMessage: "", blurred: false },
    },
    blur: function (event) {
      let ele = event.target;
      this.formData[ele.name].blurred = true;
      let rules = JSON.parse(ele.dataset.rules);
      this.formData[ele.name].errorMessage = this.getErrorMessage(
        ele.value,
        rules
      );
    },
    input: function (event) {
      let ele = event.target;
      let rules = JSON.parse(ele.dataset.rules);
      this.formData[ele.name].errorMessage = this.getErrorMessage(
        ele.value,
        rules
      );
    },
    getErrorMessage: function (value, rules) {
      let isValid = Iodine.is(value, rules);
      if (isValid !== true) {
        return Iodine.getErrorMessage(isValid);
      }
      return "";
    },
    submitData(event) {
      let inputs = [...this.$el.querySelectorAll("input[data-rules]")];
      inputs.map((input) => {
        if (Iodine.is(input.value, JSON.parse(input.dataset.rules)) !== true) {
          event.preventDefault();
        } else {
          this.buttonLabel = "Submitting...";
          this.loading = true;
          this.message = "";
          // this.message = ''
          fetch("https://at.12-36.com/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              base: "appjsgXEmliyeIbSw",
              table: "Leads",
              fields: {
                Email: this.formData.email.value,
                Name: this.formData.name.value,
                Message: this.formData.message.value,
                Phone: this.formData.phone.value,
                Site: "Launchist",
                Location: window.location.href,
                Query: new URLSearchParams(location.search).get("q"),
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              this.loading = false;
              this.showAlertMessage = false;
              this.showSuccessMessage = true;
              this.formData = {
                name: "",
                email: "",
                phone: "",
                message: "",
              };
            });
        }
      });
    },
  };
}

function submitData() {}
