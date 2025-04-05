import User from '../db/models/contacts';

export const listContacts = () => User.findAll();
export const getContactById = (id) => User.findByPk(id);
export const addContact = (data) => User.create(data);

export const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(data, {
    returning: true,
  });
};
export const removeContact = (id) =>
  User.destroy({
    where: {
      id,
    },
  });
