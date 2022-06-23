
import users from './users.js'
import authors from './authors.js'
import categories from './categories.js'
import books from './books.js'
import Author from '../models/Author';
import User from '../models/User';
import Book from '../models/Book';
import Category from '../models/Category';




const importData = async () => {
  try {
    await Book.deleteMany()
    await Author.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()

    const createdUsers = await User.insertMany(users)
    const createdAuthors = await Author.insertMany(authors)
    const createdCategories = await Category.insertMany(categories)

    const adminAuthor = createdAuthors[0]._id
    const adminCategory = createdCategories[0]._id

    const sampleproducts = books.map((book) => {
        // console.log(product);
      return { ...book, author: adminAuthor, category: adminCategory }
    })
    // console.log("sam");
    console.log(sampleproducts);

    await Book.insertMany(sampleproducts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Book.deleteMany()
    await Author.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}