export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&auto=format",
    count: 42,
    description: "Latest gadgets and devices",
  },
  {
    id: "fashion",
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format",
    count: 86,
    description: "Trending styles for every occasion",
  },
  {
    id: "home",
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format",
    count: 58,
    description: "Beautiful pieces for your home",
  },
  {
    id: "books",
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&auto=format",
    count: 124,
    description: "Knowledge and stories await",
  },
  {
    id: "sports",
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
    count: 37,
    description: "Equipment for every athlete",
  },
  {
    id: "beauty",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&auto=format",
    count: 65,
    description: "Skincare and cosmetics",
  },
];

export const products = [
  {
    id: "p1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "electronics",
    price: 24999,
    originalPrice: 34990,
    rating: 4.8,
    reviewCount: 2847,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with our best-ever noise canceling, plus 30-hour battery life and lightweight comfort. Two processors work together to cancel noise precisely, across the frequency spectrum.",
    features: [
      "30-hour battery life",
      "Multipoint connection",
      "Speak-to-chat technology",
      "Adaptive Sound Control",
      "Touch sensor controls",
    ],
    variants: [
      {
        name: "Color",
        options: ["Black", "Silver", "Midnight Blue"],
      },
    ],
    stock: 15,
    shipping: "Free delivery in 2-3 days",
    brand: "Sony",
    tags: ["headphones", "wireless", "noise-canceling", "audio"],
  },

  {
    id: "p2",
    name: "Apple MacBook Air M2",
    category: "electronics",
    price: 114900,
    originalPrice: 119900,
    rating: 4.9,
    reviewCount: 5123,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "The redesigned MacBook Air with M2 chip is impossibly thin, strikingly beautiful, and available in four colors. It features an all-new design, 13.6-inch Liquid Retina display, 1080p FaceTime HD camera, and up to 18 hours of battery life.",
    features: [
      "Apple M2 chip",
      "13.6-inch Liquid Retina display",
      "Up to 18-hour battery",
      "1080p FaceTime HD camera",
      "MagSafe charging",
    ],
    variants: [
      {
        name: "Storage",
        options: ["256GB", "512GB", "1TB"],
      },
      {
        name: "Color",
        options: ["Midnight", "Starlight", "Space Gray", "Silver"],
      },
    ],
    stock: 8,
    shipping: "Free delivery in 1-2 days",
    brand: "Apple",
    tags: ["laptop", "apple", "m2", "macbook"],
  },

  {
    id: "p3",
    name: "Levi's 511 Slim Fit Jeans",
    category: "fashion",
    price: 3499,
    originalPrice: 4999,
    rating: 4.5,
    reviewCount: 8934,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "The 511™ Slim Fit is a versatile everyday jean. Sits below waist with a slim leg. Made with stretch denim for comfort and movement. Available in a range of washes to suit every style.",
    features: [
      "Slim fit through hip and thigh",
      "98% cotton, 2% elastane",
      "Five-pocket styling",
      "Machine washable",
    ],
    variants: [
      {
        name: "Size",
        options: ["28", "30", "32", "34", "36"],
      },
      {
        name: "Color",
        options: ["Indigo Blue", "Black", "Dark Grey"],
      },
    ],
    stock: 42,
    shipping: "Free delivery in 3-5 days",
    brand: "Levi's",
    tags: ["jeans", "denim", "fashion", "mens"],
  },

  {
    id: "p4",
    name: "Organic Cotton Linen Throw Blanket",
    category: "home",
    price: 2299,
    originalPrice: 3200,
    rating: 4.7,
    reviewCount: 1203,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "Handwoven from 100% organic cotton, this luxurious throw blanket adds warmth and texture to any space. Perfect for cozy evenings or as a decorative accent. GOTS certified organic.",
    features: [
      "100% GOTS certified organic cotton",
      "Handwoven texture",
      "Machine washable",
      "Pre-washed for softness",
    ],
    variants: [
      {
        name: "Color",
        options: [
          "Natural White",
          "Dusty Rose",
          "Sage Green",
          "Charcoal",
        ],
      },
    ],
    stock: 30,
    shipping: "Free delivery in 4-6 days",
    brand: "HomeThreads",
    tags: ["blanket", "organic", "home", "cozy"],
  },

  {
    id: "p5",
    name: "Atomic Habits — James Clear",
    category: "books",
    price: 499,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 32841,
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    features: [
      "320 pages",
      "Paperback",
      "Publisher: Penguin",
      "Language: English",
    ],
    variants: [
      {
        name: "Format",
        options: ["Paperback", "Hardcover", "eBook"],
      },
    ],
    stock: 100,
    shipping: "Free delivery in 2-4 days",
    brand: "Penguin Random House",
    tags: ["books", "self-help", "habits", "bestseller"],
  },

  {
    id: "p6",
    name: "Nike Air Zoom Pegasus 40",
    category: "sports",
    price: 10795,
    originalPrice: 11995,
    rating: 4.6,
    reviewCount: 4521,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "The Nike Air Zoom Pegasus 40 continues the beloved running shoe series with improved cushioning and support. Designed for daily training, it features a breathable mesh upper and responsive Air Zoom unit in the forefoot.",
    features: [
      "React foam midsole",
      "Air Zoom unit",
      "Breathable mesh upper",
      "Rubber outsole with waffle pattern",
      "Designed for daily training",
    ],
    variants: [
      {
        name: "Size",
        options: ["6", "7", "8", "9", "10", "11", "12"],
      },
      {
        name: "Color",
        options: ["White/Black", "Blue/Orange", "All Black"],
      },
    ],
    stock: 25,
    shipping: "Free delivery in 2-3 days",
    brand: "Nike",
    tags: ["shoes", "running", "nike", "sports"],
  },

  {
    id: "p7",
    name: "The Ordinary Hyaluronic Acid 2% + B5",
    category: "beauty",
    price: 590,
    originalPrice: 750,
    rating: 4.7,
    reviewCount: 18293,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "This formulation combines low, medium and high molecular weight Hyaluronic Acid with a Hyaluronic Acid Crosspolymer to offer multi-depth hydration. It also contains Vitamin B5 which is a water-soluble vitamin that supports skin surface renewal and healing.",
    features: [
      "Multi-depth hydration",
      "Vitamin B5 included",
      "Suitable for all skin types",
      "Vegan and cruelty-free",
      "30ml",
    ],
    variants: [
      {
        name: "Size",
        options: ["30ml", "60ml"],
      },
    ],
    stock: 60,
    shipping: "Free delivery in 2-4 days",
    brand: "The Ordinary",
    tags: ["skincare", "serum", "hyaluronic", "beauty"],
  },

  {
    id: "p8",
    name: "Samsung Galaxy S24 Ultra",
    category: "electronics",
    price: 134999,
    originalPrice: 144999,
    rating: 4.8,
    reviewCount: 7832,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "Galaxy S24 Ultra with built-in S Pen. 200MP camera system with 100x Space Zoom. AI-powered photography and video. 5000mAh battery with 45W fast charging.",
    features: [
      "200MP main camera",
      "Built-in S Pen",
      "Snapdragon 8 Gen 3",
      "5000mAh battery",
      "6.8-inch Dynamic AMOLED",
    ],
    variants: [
      {
        name: "Storage",
        options: ["256GB", "512GB", "1TB"],
      },
      {
        name: "Color",
        options: ["Titanium Black", "Titanium Gray", "Titanium Violet"],
      },
    ],
    stock: 12,
    shipping: "Free delivery in 1-2 days",
    brand: "Samsung",
    tags: ["smartphone", "samsung", "galaxy", "android"],
  },

  {
    id: "p9",
    name: "Adidas Ultraboost 23",
    category: "sports",
    price: 15999,
    originalPrice: 19999,
    rating: 4.7,
    reviewCount: 3241,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "Run in endless comfort with Ultraboost 23. The new Boost midsole provides incredible energy return. The Primeknit+ upper moves with your foot for a sock-like fit.",
    features: [
      "Boost midsole",
      "Primeknit+ upper",
      "Continental rubber outsole",
      "Linear Energy Push system",
      "Torsion System",
    ],
    variants: [
      {
        name: "Size",
        options: ["6", "7", "8", "9", "10", "11"],
      },
      {
        name: "Color",
        options: ["Core Black", "Cloud White", "Solar Red"],
      },
    ],
    stock: 18,
    shipping: "Free delivery in 2-3 days",
    brand: "Adidas",
    tags: ["shoes", "running", "adidas", "sports"],
  },

  {
    id: "p10",
    name: "Wooden Serving Board Set",
    category: "home",
    price: 1899,
    originalPrice: 2500,
    rating: 4.6,
    reviewCount: 892,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "Set of 3 handcrafted acacia wood serving boards in graduated sizes. Perfect for cheese platters, charcuterie, or serving appetizers. Each board has a natural grain pattern making it unique.",
    features: [
      "Set of 3 boards",
      "Handcrafted acacia wood",
      "Natural grain pattern",
      "Food safe finish",
      "Hand wash only",
    ],
    variants: [
      {
        name: "Set",
        options: ["3-piece Set", "5-piece Set"],
      },
    ],
    stock: 22,
    shipping: "Free delivery in 3-5 days",
    brand: "WoodCraft",
    tags: ["kitchen", "wood", "serving", "home"],
  },

  {
    id: "p11",
    name: "CeraVe Moisturizing Cream",
    category: "beauty",
    price: 899,
    originalPrice: 1200,
    rating: 4.8,
    reviewCount: 25631,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "Daily face and body moisturizer for dry skin. Formulated with three essential ceramides and hyaluronic acid to help restore and maintain the skin's natural protective barrier.",
    features: [
      "3 essential ceramides",
      "Hyaluronic acid",
      "24-hour hydration",
      "Non-comedogenic",
      "Fragrance-free",
    ],
    variants: [
      {
        name: "Size",
        options: ["177ml", "340ml", "539ml"],
      },
    ],
    stock: 80,
    shipping: "Free delivery in 2-4 days",
    brand: "CeraVe",
    tags: ["skincare", "moisturizer", "beauty", "face"],
  },

  {
    id: "p12",
    name: "The Psychology of Money",
    category: "books",
    price: 399,
    originalPrice: 599,
    rating: 4.8,
    reviewCount: 15203,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=600&fit=crop&auto=format",
    ],
    description:
      "Timeless lessons on wealth, greed, and happiness by Morgan Housel. Doing well with money isn't necessarily about what you know. It's about how you behave.",
    features: [
      "256 pages",
      "Paperback",
      "Publisher: Jaico",
      "Language: English",
    ],
    variants: [
      {
        name: "Format",
        options: ["Paperback", "Hardcover"],
      },
    ],
    stock: 150,
    shipping: "Free delivery in 2-4 days",
    brand: "Jaico Publishing",
    tags: ["books", "finance", "money", "bestseller"],
  },
];

export const reviews = [
  {
    id: "r1",
    productId: "p1",
    user: "Arjun Sharma",
    avatar: "AS",
    rating: 5,
    date: "2024-11-15",
    title: "Absolutely incredible sound quality",
    comment:
      "These headphones have transformed my music experience. The noise canceling is so effective that I can block out everything during my morning commute. Battery life is impressive too — lasted 28 hours on a single charge.",
  },
  {
    id: "r2",
    productId: "p1",
    user: "Priya Mehta",
    avatar: "PM",
    rating: 4,
    date: "2024-10-28",
    title: "Great headphones, slightly tight fit",
    comment:
      "Sound quality is exceptional and the ANC works brilliantly. The only minor issue is that they feel a bit tight after 3+ hours of wear. Otherwise, absolutely worth the price.",
  },
  {
    id: "r3",
    productId: "p2",
    user: "Rahul Gupta",
    avatar: "RG",
    rating: 5,
    date: "2024-11-01",
    title: "Best laptop I've ever owned",
    comment:
      "The M2 chip is incredibly fast. I run multiple heavy apps simultaneously without any slowdown. Battery easily lasts a full working day. The build quality is premium.",
  },
  {
    id: "r4",
    productId: "p6",
    user: "Ananya Singh",
    avatar: "AN",
    rating: 5,
    date: "2024-10-20",
    title: "Perfect daily running shoe",
    comment:
      "I've been running in these for 3 months now. They provide excellent cushioning and support. The responsive foam makes long runs feel effortless.",
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Kavya Reddy",
    role: "Fashion Blogger",
    avatar: "KR",
    rating: 5,
    comment:
      "The quality of products here is unmatched. I've been shopping here for 2 years and every purchase has been perfect. The delivery is always on time and packaging is beautiful.",
    city: "Hyderabad",
  },
  {
    id: "t2",
    name: "Siddharth Nair",
    role: "Tech Enthusiast",
    avatar: "SN",
    rating: 5,
    comment:
      "Best e-commerce platform for electronics. Got my MacBook in just 24 hours with perfect packaging. Customer service was incredibly helpful when I had a query.",
    city: "Bangalore",
  },
  {
    id: "t3",
    name: "Meera Iyer",
    role: "Interior Designer",
    avatar: "MI",
    rating: 5,
    comment:
      "Love the Home & Living collection! Every piece I've ordered fits perfectly with my aesthetic vision. The product descriptions are accurate and photos match reality.",
    city: "Chennai",
  },
  {
    id: "t4",
    name: "Vikram Patel",
    role: "Fitness Coach",
    avatar: "VP",
    rating: 4,
    comment:
      "Great selection of sports gear. The Nike and Adidas selections are always updated with the latest models. Prices are competitive and delivery is quick.",
    city: "Mumbai",
  },
  {
    id: "t5",
    name: "Deepika Sharma",
    role: "Skincare Enthusiast",
    avatar: "DS",
    rating: 5,
    comment:
      "The beauty section has everything I need! Authentic products at great prices. I've been buying The Ordinary serums here for months and they're always genuine.",
    city: "Delhi",
  },
  {
    id: "t6",
    name: "Aditya Kumar",
    role: "Software Engineer",
    avatar: "AK",
    rating: 5,
    comment:
      "Smooth shopping experience from browsing to delivery. The website is intuitive and the checkout process is seamless. Highly recommend for all your shopping needs.",
    city: "Pune",
  },
];

export const formatPrice = (price) => {
  return `₹${price.toLocaleString("en-IN")}`;
};