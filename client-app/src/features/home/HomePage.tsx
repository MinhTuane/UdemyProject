import { observer } from "mobx-react-lite";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardImage
}
  from 'mdb-react-ui-kit';
import { ErrorMessage, Formik } from "formik";
import { Button, Form, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { router } from "../../app/router/route";

export default observer(function HomePage() {
  const { userStore } = useStore();
  if(userStore.isLoggedIn)  router.navigate('/productLineDashBoard');
  return (
    <MDBContainer className="my-5 gradient-form  h-100 w-100 xxl">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex h-100 flex-column ms-5 justify-content-center">

            <div className="text-center">
              <img src="/assets/lotus.webp"
                style={{ width: '185px' }} alt="logo" />
            </div>

            <Formik
              initialValues={{ email: '', password: '', error: null }}
              onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Invalid email or password' }))
              }>
              {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                  <MyTextInput placeholder="Email" name="email" />
                  <MyTextInput type="password" placeholder="Password" name="password" />
                  <ErrorMessage
                    name="error"
                    render={() => <Label style={{ marginBottom: 10 }}
                      basic color="red" content={errors.error} />}
                  />

                  <Button loading={isSubmitting} positive content='login' type='submit' fluid />
                </Form>
              )}
            </Formik>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <MDBCardImage src="/assets/login.jpg" alt="login form" className='rounded-start w-100' style={{ height: '650px' }} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  )
})