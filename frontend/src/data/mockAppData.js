export const mockUserData = {
  currentUser: {
    id: 1,
    username: "GhoulishFashionista",
    email: "draculaura@monster.high",
    bio: "Living my best afterlife! 💖 Fashion lover, vampire extraordinaire, and collector of all things pink and fabulous!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c8d8c1?w=100&h=100&fit=crop&crop=face",
    stats: {
      collections: 12,
      dolls: 47,
      friends: 23
    },
    joinedAt: "2024-01-15"
  },

  collections: [
    {
      id: 1,
      name: "Original Ghouls",
      description: "The iconic first wave of Monster High dolls that started it all!",
      coverImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
      dollsCount: 8,
      createdAt: "2024-02-01"
    },
    {
      id: 2,
      name: "Vampire Collection",
      description: "All my favorite vampire ghouls and their fabulous outfits",
      coverImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=300&h=300&fit=crop",
      dollsCount: 12,
      createdAt: "2024-02-15"
    },
    {
      id: 3,
      name: "Special Editions",
      description: "Rare and limited edition Monster High dolls",
      coverImage: "https://images.unsplash.com/photo-1515779689357-8b5b5e7a6c4a?w=300&h=300&fit=crop",
      dollsCount: 6,
      createdAt: "2024-03-01"
    },
    {
      id: 4,
      name: "Fashion Week",
      description: "Runway-ready outfits and haute couture looks",
      coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop",
      dollsCount: 15,
      createdAt: "2024-03-10"
    },
    {
      id: 5,
      name: "Movie Characters",
      description: "Dolls from all the Monster High movies and specials",
      coverImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=300&fit=crop",
      dollsCount: 9,
      createdAt: "2024-03-20"
    },
    {
      id: 6,
      name: "Holiday Specials",
      description: "Festive and seasonal Monster High collections",
      coverImage: "https://images.unsplash.com/photo-1482849297070-f4fae2173efe?w=300&h=300&fit=crop",
      dollsCount: 7,
      createdAt: "2024-04-01"
    }
  ],

  dolls: [
    {
      id: 1,
      name: "Draculaura",
      character: "Vampire",
      series: "Original",
      year: 2010,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=300&fit=crop",
      description: "The sweetest vampire who doesn't bite! Loves pink, fashion, and being vegan.",
      collectionId: 1
    },
    {
      id: 2,
      name: "Clawdeen Wolf",
      character: "Werewolf",
      series: "Original",
      year: 2010,
      image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=200&h=300&fit=crop",
      description: "Fierce fashionista with werewolf style and confidence to match.",
      collectionId: 1
    },
    {
      id: 3,
      name: "Frankie Stein",
      character: "Monster",
      series: "Original",
      year: 2010,
      image: "https://images.unsplash.com/photo-1515779689357-8b5b5e7a6c4a?w=200&h=300&fit=crop",
      description: "Electrifyingly friendly monster who's always ready to make new friends!",
      collectionId: 1
    },
    {
      id: 4,
      name: "Lagoona Blue",
      character: "Sea Monster",
      series: "Original",
      year: 2010,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=300&fit=crop",
      description: "Chill sea monster who brings the ocean vibes wherever she goes.",
      collectionId: 1
    },
    {
      id: 5,
      name: "Cleo de Nile",
      character: "Mummy",
      series: "Original",
      year: 2010,
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&h=300&fit=crop",
      description: "Royal mummy princess with impeccable taste and style.",
      collectionId: 1
    },
    {
      id: 6,
      name: "Ghoulia Yelps",
      character: "Zombie",
      series: "Original",
      year: 2011,
      image: "https://images.unsplash.com/photo-1482849297070-f4fae2173efe?w=200&h=300&fit=crop",
      description: "Brainy zombie who's the smartest ghoul at Monster High.",
      collectionId: 1
    }
  ],

  posts: [
    {
      id: 1,
      title: "New Collection Alert! 🎉",
      text: "Just added my Holiday Specials collection! So excited to share these festive ghouls with everyone. The winter wonderland Draculaura is absolutely divine! ❄️💖",
      date: "2024-04-01T10:30:00Z",
      likes: 23,
      comments: 5
    },
    {
      id: 2,
      title: "",
      text: "Can we talk about how gorgeous the new vampire collection pieces are? The detail work on their outfits is incredible! Monster High really outdid themselves this time. 🧛‍♀️✨",
      date: "2024-03-28T14:15:00Z",
      likes: 31,
      comments: 8
    },
    {
      id: 3,
      title: "Doll Photography Tips",
      text: "Been experimenting with lighting for my doll photos. Natural window light + a white poster board reflector = *chef's kiss* Perfect shots every time! What's your go-to setup? 📸",
      date: "2024-03-25T09:45:00Z",
      likes: 18,
      comments: 12
    },
    {
      id: 4,
      title: "",
      text: "Movie night with the ghouls! Rewatching all the Monster High movies while organizing my collection. Nothing beats a cozy night in with your favorite monsters! 🍿👻",
      date: "2024-03-22T20:00:00Z",
      likes: 27,
      comments: 6
    }
  ],

  friends: [
    {
      id: 1,
      username: "WerewolfStyleQueen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "online"
    },
    {
      id: 2,
      username: "ElectricFrankie",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "offline"
    },
    {
      id: 3,
      username: "SeaMonsterVibes",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      status: "online"
    },
    {
      id: 4,
      username: "MummyPrincess",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c8d8c1?w=100&h=100&fit=crop&crop=face",
      status: "away"
    }
  ],

  groups: [
    {
      id: 1,
      name: "Vampire Crew",
      description: "For all things vampire and gothic fashion",
      members: 156,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Doll Collectors United",
      description: "Share your collections and find rare dolls",
      members: 342,
      image: "https://images.unsplash.com/photo-1515779689357-8b5b5e7a6c4a?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Fashion Ghouls",
      description: "Runway looks and style inspiration",
      members: 89,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100&h=100&fit=crop"
    }
  ]
};