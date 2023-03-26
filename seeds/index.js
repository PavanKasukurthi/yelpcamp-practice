const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities.js');
const { descriptors, places } = require('./seedHelpers');

mongoose.set('strictQuery', false);

mongoose
    .connect("mongodb://127.0.0.1:27017/yelp-camp", {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// array[Math.floor(Math.random() * array.length)] //To pick a random element from an array

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63cc36fcbec97a77ee257807',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptates quam porro consequatur quos, neque architecto! Aperiam mollitia eligendi consequuntur vel nulla iure ducimus voluptatem commodi temporibus, rerum dicta odit.',
            price,
            geometry:
            {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddudiicp7/image/upload/v1674587680/YelpCamp/fdtdqqlfydl08hd1kob8.jpg',
                    filename: 'YelpCamp/fdtdqqlfydl08hd1kob8'
                },
                {
                    url: 'https://res.cloudinary.com/ddudiicp7/image/upload/v1674587677/YelpCamp/w3qt1tnjnxn23n7097np.jpg',
                    filename: 'YelpCamp/w3qt1tnjnxn23n7097np'
                }
            ]
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close(); //Closing a mongoose connection
})