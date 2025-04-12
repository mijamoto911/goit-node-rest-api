import Contact from '../db/models/contacts.js';

export const listContacts = () => Contact.findAll();
export const getContactById = (id) => Contact.findByPk(id);
export const addContact = (data) => Contact.create(data);

export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};
export const removeContact = (id) =>
  Contact.destroy({
    where: {
      id,
    },
  });
export const updateStatusContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(
    { favorite: data.favorite },
    {
      returning: true,
    }
  );
};
