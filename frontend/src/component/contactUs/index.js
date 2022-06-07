import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fvfr5sn",
        "template_9txb3go",
        form.current,
        "nQqCCfeNSMesYnqNm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    alert("email has been sent");
  };

  return (
      <div>
          <h2>Send Us Your Suggestion And Notes Via Email</h2>
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
    </div>
  );
};
export default Contact;
