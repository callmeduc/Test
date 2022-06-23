import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Duc',
    email: 'd@gmail.com',
    password: bcrypt.hashSync('1', 10),
    isAdmin: true,
  },
  {
    name: 'Bảo',
    email: 'b@gmail.com',
    password: bcrypt.hashSync('1', 10),
  },
  {
    name: 'Cao',
    email: 'c@gmail.com',
    password: bcrypt.hashSync('1', 10),
  },
]

export default users