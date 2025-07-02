import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const images = [
  // Main images
  {
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    filename: 'hero-bg.jpg'
  },
  {
    url: 'https://www.svgrepo.com/download/80806/coffee-cup.svg',
    filename: 'coffee-icon.svg'
  },
  // Coffee images
  {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/espresso.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/cappuccino.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/latte.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/mocha.jpg'
  },
  // Pastries images
  {
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/croissant.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/chocolate-muffin.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/cinnamon-roll.jpg'
  },
  // Sandwiches images
  {
    url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/grilled-cheese.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1648676717271-a8693ad6d614?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/caprese.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400',
    filename: 'menu/turkey-club.jpg'
  }
];

// Create public directory and menu subdirectory if they don't exist
const publicDir = path.join(__dirname, 'public');
const menuDir = path.join(publicDir, 'menu');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
if (!fs.existsSync(menuDir)) {
  fs.mkdirSync(menuDir);
}

// Download all images
Promise.all(
  images.map(img => 
    downloadImage(img.url, path.join(publicDir, img.filename))
  )
)
.then(() => console.log('All images downloaded successfully!'))
.catch(err => console.error('Error downloading images:', err)); 