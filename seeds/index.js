const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers.js");
const Campground = require("../models/campground.js");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!!");
});
const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60acf4558202d639ece00153",
      title: `${sample(descriptors)} ${sample(places)}`,
      price: price,
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt tempora aspernatur ad illum at qui nobis obcaecati vero sed alias reprehenderit tempore laboriosam, itaque, asperiores molestias suscipit deserunt ipsa nisi.",
      images: [
        {
          url: "https://res.cloudinary.com/nickgaur/image/upload/v1622039688/YelpCamp/va9ylm8njb8tha1t8why.jpg",
          filename: "YelpCamp/va9ylm8njb8tha1t8why",
        },
        {
          url: "https://res.cloudinary.com/nickgaur/image/upload/v1622039736/YelpCamp/hk3hrf4hmlnyyn4rd9dp.jpg",
          filename: "YelpCamp/hk3hrf4hmlnyyn4rd9dp",
        },
      ],
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
