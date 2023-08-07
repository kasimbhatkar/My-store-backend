import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@examole.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
];

export default users;