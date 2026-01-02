import { useId, useState } from 'react'
import './App.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from "./FeedbackForm.module.css";
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  message: Yup.string().min(3, "Too short").max(256, "Too long").required("Required"),
  level: Yup.string().oneOf(["good", "neutral", "bad"]).required("Required")
});

const initialValues = {
  username: "",
  email: "",
  message: "",
  level: "good",
};

function App() {
  const [count, setCount] = useState(0)

  const FeedbackForm = () => {
    const nameFieldId = useId();
    const emailFieldId = useId();
    const msgFieldId = useId();
    const levelFieldId = useId();

    // form submit işlemi için handleSubmit fonksiyonu tanımlanır.
    // values parametresi formdaki tüm alanların değerlerini içerir.
    // actions parametresi ise formik tarafından sağlanan çeşitli yardımcı fonksiyonları içerir.
    const handleSubmit = (values, actions) => {
      console.log(values);
      actions.resetForm();
    };
    // initialValues değeri formik bileşenine eklenir ve field bileşenlerinin name prop'ları ile eşleşir. Ve bu değerler formun başlangıç değerleri olarak kullanılır.
    return (
      <>

        <Formik initialValues={initialValues} onSubmit={() => { }} validationSchema={FeedbackSchema}
        >
          <Form className={css.form} onSubmit={handleSubmit}>

            <div>

              <label htmlFor={nameFieldId}>Username</label>
              <Field className={css.field} type="text" name="login" id={nameFieldId} as="textarea" />
              <ErrorMessage name="username" component="span" />
            </div>

            <div>

              <label htmlFor={emailFieldId}>Email</label>
              <Field className={css.field} type="email" name="email" id={emailFieldId} as="textarea" />
              <ErrorMessage name="email" component="span" />
            </div>

            <div>

              <label htmlFor={msgFieldId}>Message</label>
              <Field className={css.field} as="textarea" name="message" id={msgFieldId} rows="5" />
              <ErrorMessage name="message" component="span" />
            </div>

            <div>

              <label htmlFor={levelFieldId}>Service satisfaction level</label>
              <Field as="select" name="level" id={levelFieldId}>
                <option value="good">Good</option>
                <option value="neutral">Neutral</option>
                <option value="bad">Bad</option>
              </Field>
              <ErrorMessage name="level" component="span" />
            </div>

            <button className={css.btn} type="submit">Log in</button>
          </Form>
        </Formik>
      </>
    );
  };


  return (
    <>
      <FeedbackForm />
    </>
  )
}

export default App
