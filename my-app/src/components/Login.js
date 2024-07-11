import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const user = await login(values);
          if (user) {
            onLogin(user);
            navigate('/admin-dashboard');
          } else {
            alert('Invalid credentials');
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label>Email</label>
              <Field name="email" type="email" className="form-control" />
              {errors.email && touched.email ? <div className="text-danger">{errors.email}</div> : null}
            </div>
            <div className="form-group">
              <label>Password</label>
              <Field name="password" type="password" className="form-control" />
              {errors.password && touched.password ? <div className="text-danger">{errors.password}</div> : null}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
