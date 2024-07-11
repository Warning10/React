import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getAppointment, saveAppointment, getDiseases } from '../services/api';

const AppointmentSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  mobileNumber: Yup.string().required('Required'),
  birthDate: Yup.date().max(new Date(), 'Birth date must be before today').required('Required'),
  gender: Yup.string().required('Required'),
  disease: Yup.string().required('Required'),
  history: Yup.string().required('Required'),
  appointmentDateTime: Yup.date().min(new Date(), 'Appointment date must be after today').required('Required'),
});

const AddEditAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [diseases, setDiseases] = useState([]);

  const fetchAppointment = async () => {
    if (id) {
      const data = await getAppointment(id);
      setAppointment(data);
    }
  };

  const fetchDiseases = async () => {
    const data = await getDiseases();
    setDiseases(data);
  };

  useEffect(() => {
    fetchAppointment();
    fetchDiseases();
  }, [id]);

  const handleSubmit = async (values) => {
    await saveAppointment(values);
    navigate('/admin-dashboard');
  };

  return (
    <div className="container">
      <h2>{id ? 'Edit' : 'Add'} Appointment</h2>
      <Formik
        initialValues={appointment || {
          firstName: '',
          lastName: '',
          mobileNumber: '',
          birthDate: '',
          gender: '',
          disease: '',
          history: '',
          appointmentDateTime: ''
        }}
        enableReinitialize
        validationSchema={AppointmentSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label>First Name</label>
              <Field name="firstName" type="text" className="form-control" />
              {errors.firstName && touched.firstName ? <div className="text-danger">{errors.firstName}</div> : null}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <Field name="lastName" type="text" className="form-control" />
              {errors.lastName && touched.lastName ? <div className="text-danger">{errors.lastName}</div> : null}
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <Field name="mobileNumber" type="text" className="form-control" />
              {errors.mobileNumber && touched.mobileNumber ? <div className="text-danger">{errors.mobileNumber}</div> : null}
            </div>
            <div className="form-group">
              <label>Birth Date</label>
              <Field name="birthDate" type="date" className="form-control" />
              {errors.birthDate && touched.birthDate ? <div className="text-danger">{errors.birthDate}</div> : null}
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div>
                <Field name="gender" type="radio" value="Male" /> Male
                <Field name="gender" type="radio" value="Female" /> Female
              </div>
              {errors.gender && touched.gender ? <div className="text-danger">{errors.gender}</div> : null}
            </div>
            <div className="form-group">
              <label>Disease</label>
              <Field name="disease" as="select" className="form-control">
                <option value="">Select</option>
                {diseases.map((disease) => (
                  <option key={disease} value={disease}>{disease}</option>
                ))}
              </Field>
              {errors.disease && touched.disease ? <div className="text-danger">{errors.disease}</div> : null}
            </div>
            <div className="form-group">
              <label>History</label>
              <Field name="history" as="textarea" className="form-control" />
              {errors.history && touched.history ? <div className="text-danger">{errors.history}</div> : null}
            </div>
            <div className="form-group">
              <label>Appointment Date & Time</label>
              <Field name="appointmentDateTime" type="datetime-local" className="form-control" />
              {errors.appointmentDateTime && touched.appointmentDateTime ? <div className="text-danger">{errors.appointmentDateTime}</div> : null}
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="reset" className="btn btn-secondary ml-2">Reset</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditAppointment;
