import { v4 as uuidv4 } from "uuid";

interface GameCharacter {
    charName: string;
    book: string;
    imageUrl: string;
    hasClicked: boolean;
    isActive: boolean;
    id: string;
  }

const gameCharacters: GameCharacter[] = [
  {
    charName: "Joshua",
    book: "Joshua",
    imageUrl: "https://www.biblestudywithrandy.com/wp-content/uploads/2020/07/sun-and-moon.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },
  {
    charName: "Moses",
    book: "Moses",
    imageUrl: "https://answeredfaith.com/wp-content/uploads/2024/07/bible-character-Moses-2-576x1024.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },
  {
    charName: "Job",
    book: "Job",
    imageUrl: "https://cdn.catholic.com/wp-content/uploads/Job_and_his_friends-900x900.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },
  {
    charName: "Matthew",
    book: "Matthew",
    imageUrl: "https://files.logoscdn.com/v1/files/25441184/assets/5174233/content.png?download=true&signature=ilOVFliNibkwecgpUdSwnfNjOCE",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },
  {
    charName: "Elijah",
    book: "Elijah",
    imageUrl: "https://mormonbible.org/files/2010/06/Elijah-mormon.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },
  {
    charName: "Mary",
    book: "Mary",
    imageUrl: "https://www.ladiesdrawingnigh.org/wp-content/uploads/2024/03/USE-Blog-post-pics-900-x-533-2.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Jacob",
    book: "Jacob",
    imageUrl: "https://blog.adw.org/wp-content/uploads/2017/07/Jacob-Dore2-3.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Noah",
    book: "Noah",
    imageUrl: "https://i.pinimg.com/474x/63/04/b0/6304b0461fd2cec3b6a2fcc95d0afc6b.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Issac",
    book: "Issac",
    imageUrl: "https://www.understandchristianity.com/wp-content/uploads/2014/01/157026851_8x10-print-old-testament-bible-abraham-sacrifice-of-1.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },
  {
    charName: "Peter",
    book: "Peter",
    imageUrl: "https://www.gci.org/files/Peter_walks_on_water_toward_Jesus_0.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "James",
    book: "James",
    imageUrl: "https://d1ew29ehidhb9s.cloudfront.net/wp-content/uploads/2022/04/James-1-1-scaled.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "John",
    book: "John",
    imageUrl: "https://the-bible.net/wp-content/uploads/2021/01/john.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Paul",
    book: "Paul",
    imageUrl: "https://www.mountcarmelblessedsacrament.com/wp-content/uploads/2021/01/Saint-Pauls-Conversion.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Phillip",
    book: "Phillip",
    imageUrl: "https://www.goodsalt.com/media/catalog/product/cache/fa7b3d4dcd4fba51eb08353ff3f40b2d/t/h/the-ethiopian-chooses-to-follow-jesus-GoodSalt-lfwas1343_1.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Jesus",
    book: "Bible",
    imageUrl: "https://www.penstrokes.co.ke/wp-content/uploads/2016/05/jesus-christ-cross-images-2-1.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Isaiah",
    book: "Isaiah",
    imageUrl: "https://assets.ldscdn.org/62/cb/62cb277ad56b11eb91e4eeeeac1eaf66f913ec9a/old_testament_stories_isaiah_the_prophet_1.jpeg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "David",
    book: "David",
    imageUrl: "https://grace.allpurposeguru.com/wp-content/uploads/2021/10/David-fighting-Goliath.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Solomon",
    book: "Solomon",
    imageUrl: "https://www.biblicalarchaeology.org/wp-content/uploads/2024/05/1-Raffaello_Sanzio_The_Judgment_of_Solomon.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Ezra",
    book: "Ezra",
    imageUrl: "https://jesusinbible.com/wp-content/uploads/brizy/imgs/Ezra-912x606x0x0x912x547x1618978998.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Nehemiah",
    book: "Nehemiah",
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBmMVtVEF5DQ6SaQKZd4k9VLuhJ6MElwquHd50cTU5oVBlbz6C_Y1wahaT7Ip5jJoSakZ8Lu_qF7pgve5kywvYDmESplsF5WHoKPdd1DCQrjUjLAZrtgwglCjfbYt16k7bUfYUTeQNt88Y/s1600/nehemiah.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Adam",
    book: "Adam",
    imageUrl: "https://kezi.wordpress.com/wp-content/uploads/2008/06/adam-and-eve-banished-from-garden-of-eden.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Sarah",
    book: "Sarah",
    imageUrl: "https://i.pinimg.com/474x/ee/f4/c4/eef4c4e1ca57e4f35e625514e36b8f17.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Aaron",
    book: "Aaron",
    imageUrl: "https://the-scarlet-thread.com/wp-content/uploads/2018/11/high-priest.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Ruth",
    book: "Ruth",
    imageUrl: "https://i.pinimg.com/originals/dd/21/56/dd215641366ba2e30fa384fefd499478.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Esther",
    book: "Esther",
    imageUrl: "https://i.pinimg.com/originals/68/1c/02/681c0223dea4c232addd9d93c0ceb868.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Jonah",
    book: "Jonah",
    imageUrl: "https://lifespringchurch.net/wp-content/uploads/2022/06/Jonah-the-Big-Fish.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Timothy",
    book: "Timothy",
    imageUrl: "https://www.goodsalt.com/media/catalog/product/cache/72eeda554d65337da0ae7df201fead63/p/a/paul-meets-timothy-GoodSalt-lfwas1210.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Stephen",
    book: "Stephen",
    imageUrl: "https://www.goodsalt.com/media/catalog/product/cache/1531be02bf54fbb1f30169a0665cbe0f/s/t/stephen-preached-GoodSalt-lfwas0404.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Caleb",
    book: "Caleb",
    imageUrl: "https://i0.wp.com/www.meisterdrucke.uk/kunstwerke/1260px/William_Brassey_Hole_-_The_report_of_the_Spies_and_remonstrance_of_Caleb_-_Bible_-_%28MeisterDrucke-650111%29.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  },

  {
    charName: "Deborah",
    book: "Deborah",
    imageUrl: "https://i0.wp.com/beautifulrosesnigeria.org/wp-content/uploads/2022/10/Deborah-the-judge-of-israel.jpg",
    hasClicked: false,
    isActive: false,
    id: uuidv4(),
  }
];

export default gameCharacters;