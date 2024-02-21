const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch((err) => {
	console.log('Connection failed!');
	console.log(err);
});

async function main() {
	await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
	// console.log('MONGO Connection successful!');
	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '65cd26b51a4ae7f5800c35cd',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore laborum officiis similique nisi dolorem explicabo ipsam aspernatur vel, placeat doloremque. Vel repellat cumque consequuntur voluptatibus? Ab laborum laboriosam autem.',
			price,
			geometry: {
				type: 'Point',
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude,
				],
			},
			images: [
				{
					url: 'https://res.cloudinary.com/dxxtkych7/image/upload/v1708519703/YelpCamp/vjrbtveii7tjf50l7rvy.jpg',
					filename: 'YelpCamp/vjrbtveii7tjf50l7rvy',
				},
				{
					url: 'https://res.cloudinary.com/dxxtkych7/image/upload/v1708519709/YelpCamp/fpabfddooyskhvb50eu3.jpg',
					filename: 'YelpCamp/fpabfddooyskhvb50eu3',
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	db.close();
});
