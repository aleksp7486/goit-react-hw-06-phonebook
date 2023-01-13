import { Item, Text, Icon, Number, Btn } from './ContactList.styled';
import { BsFillPersonFill, BsFillPersonXFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selector';
import { deleteContact } from 'redux/contactsSlice';
import { useMemo } from 'react';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  return (
    <ul>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <Item key={name} id={id}>
            <Icon>
              <BsFillPersonFill />
            </Icon>
            <Text>
              {name}:<Number>{number}</Number>
            </Text>
            <Btn onClick={() => dispatch(deleteContact(id))}>
              <BsFillPersonXFill />
            </Btn>
          </Item>
        );
      })}
    </ul>
  );
};

export default ContactList;
