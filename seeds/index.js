const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require("../models/campground");
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '66b1c9dc020554df4fcc5c43',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur fugiat cum quo molestiae, doloremque voluptas voluptatibus alias qui, consectetur autem excepturi ipsa molestias similique perferendis hic repellendus eum! Aperiam, impedit?',
      price ,
      geometry: {
        type: "Point",
        coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
    },
    images: [
        {
            url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
            filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
        },
        {
            url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
            filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
        }
    ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})