const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

main().catch((err) => console.log("Error", err));
async function main() {
  console.log("connecting...");
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
  console.log("connection open");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "68c7b6697b444249c320ff66",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,

      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi odit tempora voluptate quam provident quisquam doloribus temporibus quas, molestias voluptatibus, itaque fugit culpa, beatae officia minus! Odio vero error sint?",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dsadegk3n/image/upload/v1758518910/YelpCamp/zjszfbxv0yzfs1qvaett.jpg",
          filename: "YelpCamp/zjszfbxv0yzfs1qvaett",
        },
        {
          url: "https://res.cloudinary.com/dsadegk3n/image/upload/v1758518911/YelpCamp/imayuphxoyugn1muzlhw.jpg",
          filename: "YelpCamp/imayuphxoyugn1muzlhw",
        },
        {
          url: "https://res.cloudinary.com/dsadegk3n/image/upload/v1758518910/YelpCamp/h6eorw64l2yjsdklui9x.jpg",
          filename: "YelpCamp/h6eorw64l2yjsdklui9x",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
