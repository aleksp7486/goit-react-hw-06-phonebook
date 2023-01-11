import { Item, Text, Icon, Number, Btn } from './ContactList.styled';
import { BsFillPersonFill, BsFillPersonXFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { LS_CONTACTS } from 'redux/constants';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selector';
import { deleteContact } from 'redux/contactsSlice';
import { useMemo } from 'react';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    const contactsJSON = JSON.stringify(contacts);
    localStorage.setItem(LS_CONTACTS, contactsJSON);
  }, [contacts]);

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
