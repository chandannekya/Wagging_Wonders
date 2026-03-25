const mongoose = require('mongoose');

// Mongoose Models
const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const groomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: String,
  location: String,
  price: Number,
  image: String,
  services: [{ name: String, price: Number }]
});

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: String,
  clinicName: String,
  location: String,
  consultationFee: Number,
  rating: Number,
  image: String
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: String,
  duration: String,
  price: Number,
  level: String,
  image: String,
  description: String
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  readTime: Number,
  tags: [String],
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  stock: Number,
  category: String,
  image: String
});

// Seed Data
const donations = [
  { donorName: "Sarah M.", amount: 150, message: "For the shelter pups! 🐶" },
  { donorName: "Michael B.", amount: 50, message: "Keep up the great work!" },
  { donorName: "Anonymous", amount: 200, message: "In loving memory of Bella." }
];

const groomers = [
  {
    name: "Paws & Bubbles Spa",
    specialty: "Full Service Grooming",
    location: "Downtown Clinic, NY",
    price: 60,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80",
    services: [
      { name: "Bath & Brush", price: 30 },
      { name: "Full Haircut", price: 60 },
      { name: "Nail Trimming", price: 15 }
    ]
  },
  {
    name: "Happy Tails Grooming",
    specialty: "Puppy Styling",
    location: "Westside Pet Center, LA",
    price: 45,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    services: [
      { name: "Bath & Brush", price: 25 },
      { name: "Flea Treatment", price: 45 },
      { name: "Nail Trimming", price: 15 }
    ]
  }
];

const vets = [
  {
    name: "Dr. Emily Watson",
    specialty: "General Veterinary Practice",
    clinicName: "Wagging Wellness Clinic",
    location: "789 Pet Avenue, NY",
    consultationFee: 75,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Dr. James Carter",
    specialty: "Feline Specialist",
    clinicName: "The Cat Doctor",
    location: "456 Meow Lane, LA",
    consultationFee: 85,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Dr. Sarah Jenkins",
    specialty: "Canine Orthopedics",
    clinicName: "Advanced Pet Care",
    location: "101 Bark St, TX",
    consultationFee: 120,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1596272875729-4fcbc32c322d?auto=format&fit=crop&w=400&q=80"
  }
];

const courses = [
  {
    title: "Puppy Kindergarten",
    instructor: "Mark Rover",
    duration: "4 Weeks",
    price: 150,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80",
    description: "Start your puppy off right with basic obedience, socialization, and potty training."
  },
  {
    title: "Advanced Obedience",
    instructor: "Jessica Trainer",
    duration: "6 Weeks",
    price: 250,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1587300003388-59208cb962c6?auto=format&fit=crop&w=400&q=80",
    description: "Take your dog's skills to the next level with off-leash training and complex commands."
  }
];

const articles = [
  {
    title: "Top 10 Superfoods for Your Dog",
    content: "Feeding your dog the right diet is essential to their long-term health. While commercial kibble provides the basics, integrating superfoods like blueberries, sweet potatoes, and salmon can drastically improve their coat, energy levels, and digestion. Always consult your vet before making major dietary changes, but start small!",
    author: "Dr. Emily Watson",
    readTime: 4,
    tags: ["Diet", "Health", "Dogs"],
    image: "https://images.unsplash.com/photo-1585848243171-ecab6c96ce56?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Understanding Cat Body Language",
    content: "Cats are notoriously mysterious, but their tails and ears tell a story. An upright, slightly curved tail means they are happy and approachable. Flat ears and a thrashing tail mean they are overstimulated and need space. By paying attention to these micro-expressions, you can build a stronger bond with your feline friend.",
    author: "Samantha Fields",
    readTime: 6,
    tags: ["Behavior", "Cats", "Guide"],
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80"
  }
];

const products = [
  {
    name: "Premium Salmon Kibble",
    description: "High-protein, grain-free salmon kibble designed for sensitive stomachs and shiny coats.",
    price: 45.99,
    stock: 25,
    category: "Food",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Indestructible Chew Toy",
    description: "Built for heavy chewers, this natural rubber toy will last for months.",
    price: 15.50,
    stock: 120,
    category: "Toys",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Orthopedic Memory Foam Bed",
    description: "Support your older dog's joints with this luxury memory foam mattress.",
    price: 89.99,
    stock: 10,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Gourmet Catnip Treats",
    description: "100% organic, locally sourced catnip bites that your cat will go crazy for.",
    price: 8.99,
    stock: 0,
    category: "Treats",
    image: "https://images.unsplash.com/photo-1623387641177-3140d348b598?auto=format&fit=crop&w=400&q=80"
  }
];

// Seeding Logic
const seedDatabase = async () => {
  const URI_BASE = "mongodb://127.0.0.1:27017";
  console.log("🌱 Starting Database Seeding Process...");

  try {
    // 1. Donations
    const connDonation = await mongoose.createConnection(`${URI_BASE}/donation`);
    const Donation = connDonation.model('Donation', donationSchema);
    await Donation.deleteMany({});
    await Donation.insertMany(donations);
    console.log("✅ Seeded Donations!");
    await connDonation.close();

    // 2. Groomers
    const connGrooming = await mongoose.createConnection(`${URI_BASE}/grooming`);
    const Groomer = connGrooming.model('Groomer', groomerSchema);
    await Groomer.deleteMany({});
    await Groomer.insertMany(groomers);
    console.log("✅ Seeded Groomers!");
    await connGrooming.close();

    // 3. Vets
    const connVet = await mongoose.createConnection(`${URI_BASE}/vet`);
    const Vet = connVet.model('Vet', vetSchema);
    await Vet.deleteMany({});
    await Vet.insertMany(vets);
    console.log("✅ Seeded Vets!");
    await connVet.close();

    // 4. Training Courses
    const connTraining = await mongoose.createConnection(`${URI_BASE}/training`);
    const Course = connTraining.model('Course', courseSchema);
    await Course.deleteMany({});
    await Course.insertMany(courses);
    console.log("✅ Seeded Training Courses!");
    await connTraining.close();

    // 5. Blog Articles
    const connBlog = await mongoose.createConnection(`${URI_BASE}/blog`);
    const Article = connBlog.model('Article', articleSchema);
    await Article.deleteMany({});
    await Article.insertMany(articles);
    console.log("✅ Seeded Blog Articles!");
    await connBlog.close();

    // 6. Store Products
    const connStore = await mongoose.createConnection(`${URI_BASE}/store`);
    const Product = connStore.model('Product', productSchema);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Seeded Store Products!");
    await connStore.close();

    console.log("\n🎉 Seeding Complete! All collections populated with rich data.");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();
