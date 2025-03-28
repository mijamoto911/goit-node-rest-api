# goit-node-rest-api

## 📦 Опис

Це REST API для керування колекцією контактів. Побудований з використанням Node.js та Express. Дані зберігаються у локальному файлі `contacts.json`.

---

## 🚀 Запуск проєкту

1. Клонувати репозиторій:

   ```bash
   git clone https://github.com/<your-username>/goit-node-rest-api.git
   cd goit-node-rest-api


   ```

   Встановити залежності:

```bash
npm install
```

Запустити сервер:

```bash
npm run dev
```

Сервер буде доступний за адресою:

```arduino
http://localhost:3000
```

📚 API Роути

- GET /api/contacts
  Отримати список усіх контактів

- GET /api/contacts/:id
  Отримати один контакт за ID
  404, якщо не знайдено

- POST /api/contacts
  Створити новий контакт
  Обов’язкові поля:

```json
{
"name": "Name",
"email": "email@example.com",
"phone": "+380..."
}
400, якщо не передано обов’язкові поля
```

- PUT /api/contacts/:id
  Оновити контакт (будь-яке поле)

```json
{
"name": "New Name"
}
400, якщо не передано жодного поля

404, якщо не знайдено
```

- DELETE /api/contacts/:id
  Видалити контакт за ID 404, якщо не знайдено

🛠 Технології

- Node.js
- Express
- Joi (валідація)
- Nodemon (розробка)

- File System API (fs/promises)

🧑‍💻 Автор
Автор: Eduard Schumacher Email: mijamoto911@gmail.com
