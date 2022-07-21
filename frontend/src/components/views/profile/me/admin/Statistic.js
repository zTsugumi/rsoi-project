import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { DatePicker, Form, FormItem, Input, SubmitButton } from 'formik-antd';
import AllActions from '../../../../../redux/actions/allActions';
import { Loading } from '../../../../loading/Loading';
import './Statistic.css';
import LogBox from './LogBox';

function Statistic() {
  const [formError] = useState('');

  const stat = useSelector((state) => state.stat);
  const dispatch = useDispatch();

  const disableDate = (current) => {
    // can not select days after today
    return current && current > moment().endOf('day');
  };

  const handleOnSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    const query = {
      serviceName: values.serviceName,
      fromDate: values.datePicker && moment(values.datePicker[0]).toISOString(),
      toDate: values.datePicker && moment(values.datePicker[1]).toISOString(),
    };

    dispatch(AllActions.StatActions.statGet(query));

    actions.setSubmitting(false);
  };

  const queryValidationSchema = Yup.object().shape({
    serviceName: Yup.string()
      .max(50, 'Service name must be less than 50 characters')
      .required('Service name is required'),
    datePicker: Yup.array().of(Yup.date().max(moment().endOf('day'))),
  });

  return (
    <div className='profilebox'>
      <Row>
        <Formik
          initialValues={{ serviceName: '' }}
          validationSchema={queryValidationSchema}
          onSubmit={handleOnSubmit}
        >
          {(props) => (
            <Form className='searchbar'>
              <FormItem name='serviceItem' style={{ width: '50%' }} required={true}>
                <Input name='serviceName' placeholder='Enter service name' />
              </FormItem>
              <FormItem name='dateItem'>
                <DatePicker.RangePicker
                  name='datePicker'
                  disabledDate={disableDate}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                  }}
                  format='YYYY-MM-DD HH:mm:ss'
                />
              </FormItem>
              <SubmitButton>Submit</SubmitButton>
              {formError && (
                <label>
                  <p>{formError}</p>
                </label>
              )}
            </Form>
          )}
        </Formik>
      </Row>
      <Row className='logbox'>{stat.isLoading ? <Loading /> : <LogBox stat={stat} />}</Row>
    </div>
  );
}

export default Statistic;
