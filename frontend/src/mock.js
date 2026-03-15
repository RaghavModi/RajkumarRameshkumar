// Mock data for Rajkumar Rameshkumar Textile Manufacturing

export const companyInfo = {
  name: "Rajkumar Rameshkumar",
  tagline: "Premium PV, PC & R/C Fabrics – Direct from Manufacturer",
  location: "Ahmedabad, Gujarat, India",
  phone: "+91 98256 06234",
  whatsapp: "+91 98256 06234",
  email: "info@rajkumarfabrics.com",
  mapUrl: "https://maps.app.goo.gl/tz9BJ3upMEj7PSLT8",
  description: "Leading textile manufacturer specializing in high-quality PV, PC, and R/C fabrics. With years of expertise in fabric production, we serve domestic and international markets with consistent quality and reliable delivery."
};

export const products = [
  {
    id: 1,
    name: "PV Fabrics",
    fullName: "Polyester Viscose Fabrics",
    description: "Durable polyester viscose fabrics ideal for uniforms and formal garments. Perfect blend of polyester's durability and viscose's comfort.",
    features: [
      "Excellent wrinkle resistance",
      "Superior color retention",
      "Comfortable all-day wear",
      "Easy maintenance",
      "Cost-effective solution",
      "Professional appearance"
    ],
    applications: [
      "Corporate uniforms",
      "Formal suits",
      "School uniforms",
      "Workwear"
    ],
    widthRange: "36 - 58 inches",
    colors: ["White","Red", "Green", "Navy Blue", "Black", "Grey", "Beige", "Brown", "Charcoal"],
    image: "/images/PV_fabrics.png",
    subProducts: [
      {
        id: 11,
        name: "Sports Star",
        description: "Shirt, Pajama, Multi-purpose",
        gsm: "180-240 GSM",
        blend: "40% Polyester, 60% Viscose",
        features: ["Anti-pilling", "Wrinkle-free", "Color-fast", "Easy care"],
        colors: ["Navy Blue", "Black", "Grey", "Maroon", "Bottle Green"],
        applications: ["Corporate wear", "School uniforms", "Security uniforms", "Hotel staff"]
      },
      {
        id: 12,
        name: "Cool n Cool",
        description: "Premium quality suiting fabric for formal wear and business suits.",
        gsm: "220-280 GSM",
        blend: "60% Polyester, 40% Viscose",
        features: ["Rich texture", "Excellent drape", "Stain resistant", "Long-lasting"],
        colors: ["Charcoal", "Navy", "Black", "Brown", "Grey"],
        applications: ["Business suits", "Blazers", "Formal trousers", "Waistcoats"]
      },
      {
        id: 13,
        name: "Sunnex",
        description: "Comfortable and elegant shirting fabric for formal and casual shirts.",
        gsm: "120-160 GSM",
        blend: "55% Polyester, 45% Viscose",
        features: ["Breathable", "Smooth finish", "Non-iron", "Lightweight"],
        colors: ["White", "Light Blue", "Pink", "Beige", "Cream"],
        applications: ["Formal shirts", "Casual shirts", "Office wear", "Party wear"]
      }
    ]
  },
  {
    id: 2,
    name: "PC Fabrics",
    fullName: "Polyester Cotton Fabrics",
    description: "Polyester cotton blends designed for comfort and durability. Best of both worlds - cotton's breathability with polyester's strength.",
    features: [
      "Breathable and comfortable",
      "High durability",
      "Low shrinkage",
      "Smooth finish",
      "Easy to wash and maintain",
      "Color stability"
    ],
    applications: [
      "Shirts and blouses",
      "Casual wear",
      "Summer clothing",
      "Uniforms"
    ],
    widthRange: "36 - 58 inches",
    colors: ["White", "Sky Blue", "Pink", "Mint Green", "Cream", "Light Grey"],
    image: "/images/PC_Fabrics.png",
    subProducts: [
      {
        id: 21,
        name: "Smile",
        description: "Premium shirting fabric combining cotton comfort with polyester durability.",
        gsm: "110-150 GSM",
        blend: "65% Polyester, 35% Cotton",
        features: ["Soft feel", "Breathable", "Easy care", "Wrinkle resistant"],
        colors: ["White", "Sky Blue", "Pink", "Lemon", "Peach", "Mint Green"],
        applications: ["Formal shirts", "Casual shirts", "School uniforms", "Office wear"]
      },
      {
        id: 22,
        name: "Provogue",
        description: "Comfortable fabric perfect for everyday casual clothing and summer wear.",
        gsm: "130-170 GSM",
        blend: "60% Cotton, 40% Polyester",
        features: ["Lightweight", "Moisture-wicking", "Soft texture", "Durable"],
        colors: ["White", "Cream", "Beige", "Light Grey", "Pastel shades"],
        applications: ["T-shirts", "Casual wear", "Summer clothing", "Kids wear"]
      },
      {
        id: 23,
        name: "Kangan",
        description: "Durable and comfortable fabric for institutional and corporate uniforms.",
        gsm: "150-200 GSM",
        blend: "55% Polyester, 45% Cotton",
        features: ["Heavy-duty", "Color-fast", "Anti-bacterial finish", "Low maintenance"],
        colors: ["Navy", "Black", "Grey", "Maroon", "Royal Blue"],
        applications: ["Hospital uniforms", "School uniforms", "Industrial wear", "Service uniforms"]
      },
      {
        id: 24,
        name: "Surabhi",
        description: "Strong twill weave fabric ideal for trousers and workwear.",
        gsm: "180-220 GSM",
        blend: "65% Polyester, 35% Cotton",
        features: ["Diagonal weave", "Extra strength", "Wrinkle resistant", "Professional look"],
        colors: ["Black", "Navy", "Khaki", "Olive", "Brown"],
        applications: ["Trousers", "Workwear", "Cargo pants", "Chinos"]
      }
    ]
  },
  {
    id: 3,
    name: "R/C Fabrics",
    fullName: "Rayon Cotton Fabrics",
    description: "Rayon cotton blends suitable for premium shirting and fashion wear. Luxurious feel with excellent drape and comfort.",
    features: [
      "Luxurious drape",
      "Soft hand feel",
      "Excellent moisture absorption",
      "Rich appearance",
      "Vibrant colors",
      "Breathable and comfortable"
    ],
    applications: [
      "Premium shirts",
      "Designer wear",
      "Ethnic garments",
      "Fashion apparel"
    ],
    widthRange: "36 - 58 inches",
    colors: ["White", "Ivory", "Pastel Blue", "Lavender", "Peach", "Sage Green"],
    image: "/images/RC_Fabrics.png",
    subProducts: [
      {
        id: 31,
        name: "R/C Premium Shirting",
        description: "Luxury shirting fabric with silk-like texture for high-end formal wear.",
        gsm: "100-140 GSM",
        blend: "60% Rayon, 40% Cotton",
        features: ["Silk-like feel", "Excellent drape", "Rich luster", "Comfortable"],
        colors: ["White", "Ivory", "Pastel Blue", "Peach", "Lavender", "Mint"],
        applications: ["Premium shirts", "Designer shirts", "Ethnic wear", "Party wear"]
      },
      {
        id: 32,
        name: "R/C Ethnic Wear Fabrics",
        description: "Perfect for traditional and ethnic garments with rich colors and texture.",
        gsm: "120-160 GSM",
        blend: "55% Rayon, 45% Cotton",
        features: ["Vibrant colors", "Soft texture", "Easy drape", "Traditional appeal"],
        colors: ["Maroon", "Royal Blue", "Emerald Green", "Golden", "Deep Red"],
        applications: ["Kurtas", "Ethnic shirts", "Traditional wear", "Festival clothing"]
      },
      {
        id: 33,
        name: "R/C Fashion Fabrics",
        description: "Contemporary fashion fabric for modern designs and casual elegance.",
        gsm: "110-150 GSM",
        blend: "50% Rayon, 50% Cotton",
        features: ["Trendy appeal", "Lightweight", "Color variety", "Versatile"],
        colors: ["Coral", "Turquoise", "Mustard", "Olive", "Wine", "Charcoal"],
        applications: ["Fashion wear", "Casual shirts", "Dresses", "Designer garments"]
      },
      {
        id: 34,
        name: "R/C Slub Fabrics",
        description: "Textured slub fabric with unique character for casual and semi-formal wear.",
        gsm: "130-170 GSM",
        blend: "55% Cotton, 45% Rayon",
        features: ["Textured finish", "Unique appearance", "Breathable", "Natural look"],
        colors: ["Natural", "Beige", "Light Grey", "Sky Blue", "Soft Pink"],
        applications: ["Casual shirts", "Summer wear", "Relaxed fit clothing", "Beach wear"]
      }
    ]
  }
];

export const whyChooseUs = [
  {
    title: "Direct Manufacturer",
    description: "Buy directly from the source with no middlemen, ensuring best prices and quality control.",
    icon: "factory"
  },
  {
    title: "Consistent Quality",
    description: "Stringent quality checks at every stage to deliver fabrics that meet international standards.",
    icon: "award"
  },
  {
    title: "Wide Design Range",
    description: "Extensive collection of colors, patterns, and fabric blends to suit all your requirements.",
    icon: "layers"
  },
  {
    title: "Competitive Pricing",
    description: "Direct manufacturer pricing with transparent cost structure for bulk orders.",
    icon: "tag"
  },
  {
    title: "Bulk Order Supply",
    description: "Capable of handling large volume orders with consistent quality and timely delivery.",
    icon: "package"
  },
  {
    title: "Reliable Delivery",
    description: "Efficient logistics network ensuring on-time delivery across India and export markets.",
    icon: "truck"
  }
];

export const galleryImages = [
  {
    id: 1,
    title: "Sunnex",
    category: "PV Fabrics",
    image: "/images/sunnex.png"
  },
  {
    id: 2,
    title: "PC",
    category: "PC Fabrics",
    image: "/images/PC.png"
  },
  {
    id: 3,
    title: "R/C Premium Collection",
    category: "R/C Fabrics",
    image: "/images/RC.png"
  },
  {
    id: 4,
    title: "Uniform Fabric Samples",
    category: "PV Fabrics",
    image: "https://images.unsplash.com/photo-1603217039863-aa43d6a44ae2?w=600"
  },
  {
    id: 5,
    title: "Cotton Blend Textures",
    category: "PC Fabrics",
    image: "https://images.unsplash.com/photo-1519167758510-83e8dcb6c010?w=600"
  },
  {
    id: 6,
    title: "Shirting Fabric Range",
    category: "R/C Fabrics",
    image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600"
  },
  {
    id: 7,
    title: "Color Swatches",
    category: "All Categories",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600"
  },
  {
    id: 8,
    title: "Fabric Roll Storage",
    category: "Manufacturing",
    image: "https://images.unsplash.com/photo-1617068919530-fc28e6b6cf2d?w=600"
  },
  {
    id: 9,
    title: "Quality Check Process",
    category: "Manufacturing",
    image: "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=600"
  }
];

export const aboutHighlights = [
  {
    title: "Years of Expertise",
    description: "Decades of experience in textile manufacturing with deep industry knowledge."
  },
  {
    title: "Quality Focus",
    description: "Commitment to producing fabrics that meet the highest quality standards."
  },
  {
    title: "Bulk Production",
    description: "State-of-the-art facilities capable of handling large-scale production."
  },
  {
    title: "Global Reach",
    description: "Serving domestic and international markets with reliable supply chain."
  }
];
