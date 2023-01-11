import { BsFillPersonPlusFill } from 'react-icons/bs';
import { Formik, Form } from 'formik';
import { Label, Input, Btn, Error } from './ContactForm.styled';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selector';

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup.string().max(40).required('Укажите имя'),
  number: yup
    .number()
    .typeError('Это не похоже на номер телефона')
    .positive('Номер телефона не может начинаться с минуса')
    .integer('Номер телефона не может содержать десятичную точку')
    .min(8, 'Число должно быть больше или равно 8')
    .required('Укажите номер телефона'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onFormSubmit = ({ name, number }, { resetForm }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.find(contact => contact.number === number)) {
      alert(`Number ${number} already exists`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onFormSubmit}
    >
      <Form noValidate>
        <Label>
          Name:
          <Input type="text" name="name" placeholder="Введите имя" required />
          <Error name="name" component="p" />
        </Label>

        <Label>
          Number:
          <Input
            type="tel"
            name="number"
            placeholder="Введите номер телефона"
            required
          />
          <Error name="number" component="p" />
        </Label>
        <Btn type="submit">
          <span>
            <BsFillPersonPlusFill />
          </span>
          Add contact
        </Btn>
      </Form>
    </Formik>
  );
};

export default ContactForm;
