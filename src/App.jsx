import { Box } from './components/Box';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

export default function App() {
  return (
    <Box pt="120px">
      <Box m="auto" p={4} maxWidth="350px" bg="#cfe5e7" ko>
        <Section title="Phone-book">
          <ContactForm />
        </Section>
        <Section title="Contacts">
          <Filter />
          <ContactList />
        </Section>
      </Box>
    </Box>
  );
}
