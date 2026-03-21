import { Game, Category } from './types';

export const GAMES: Game[] = [
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    category: 'Action',
    description: 'A fast-paced 1v1 building and shooting game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/1v1-lol.png',
    gameUrl: 'https://gn-math.github.io/1v1-lol/'
  },
  {
    id: '2048',
    title: '2048',
    category: 'Puzzle',
    description: 'Combine tiles to reach the 2048 tile.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/2048.png',
    gameUrl: 'https://gn-math.github.io/2048/'
  },
  {
    id: '3-slice',
    title: '3 Slice',
    category: 'Puzzle',
    description: 'Slice shapes into pieces to clear the level.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/3-slice.png',
    gameUrl: 'https://gn-math.github.io/3-slice/'
  },
  {
    id: '99-balls',
    title: '99 Balls',
    category: 'Puzzle',
    description: 'Shoot balls to break numbered blocks.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/99-balls.png',
    gameUrl: 'https://gn-math.github.io/99-balls/'
  },
  {
    id: 'a-dance-of-fire-and-ice',
    title: 'A Dance of Fire and Ice',
    category: 'Puzzle',
    description: 'A rhythm game about two orbiting planets.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/a-dance-of-fire-and-ice.png',
    gameUrl: 'https://gn-math.github.io/a-dance-of-fire-and-ice/'
  },
  {
    id: 'among-us',
    title: 'Among Us',
    category: 'Action',
    description: 'Find the impostor among the crew.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/among-us.png',
    gameUrl: 'https://gn-math.github.io/among-us/'
  },
  {
    id: 'angry-birds',
    title: 'Angry Birds',
    category: 'Puzzle',
    description: 'Launch birds to destroy the pigs buildings.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/angry-birds.png',
    gameUrl: 'https://gn-math.github.io/angry-birds/'
  },
  {
    id: 'backrooms',
    title: 'Backrooms',
    category: 'Adventure',
    description: 'Explore the mysterious and eerie backrooms.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/backrooms.png',
    gameUrl: 'https://gn-math.github.io/backrooms/'
  },
  {
    id: 'bad-ice-cream',
    title: 'Bad Ice Cream',
    category: 'Action',
    description: 'Collect fruit and avoid enemies as an ice cream.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bad-ice-cream.png',
    gameUrl: 'https://gn-math.github.io/bad-ice-cream/'
  },
  {
    id: 'bad-ice-cream-2',
    title: 'Bad Ice Cream 2',
    category: 'Action',
    description: 'The sequel to the popular ice cream game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bad-ice-cream-2.png',
    gameUrl: 'https://gn-math.github.io/bad-ice-cream-2/'
  },
  {
    id: 'bad-ice-cream-3',
    title: 'Bad Ice Cream 3',
    category: 'Action',
    description: 'The third installment of the ice cream series.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bad-ice-cream-3.png',
    gameUrl: 'https://gn-math.github.io/bad-ice-cream-3/'
  },
  {
    id: 'baldis-basics',
    title: 'Baldis Basics',
    category: 'Adventure',
    description: 'A surreal horror game set in a school.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/baldis-basics.png',
    gameUrl: 'https://gn-math.github.io/baldis-basics/'
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    description: 'A wacky and unpredictable basketball game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/basket-random.png',
    gameUrl: 'https://gn-math.github.io/basket-random/'
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    category: 'Sports',
    description: 'Show off your basketball skills in 1v1 matches.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/basketball-stars.png',
    gameUrl: 'https://gn-math.github.io/basketball-stars/'
  },
  {
    id: 'bitlife',
    title: 'BitLife',
    category: 'Strategy',
    description: 'A life simulator game where you make choices.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bitlife.png',
    gameUrl: 'https://gn-math.github.io/bitlife/'
  },
  {
    id: 'bloons-td-4',
    title: 'Bloons TD 4',
    category: 'Strategy',
    description: 'The fourth installment of the tower defense series.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bloons-td-4.png',
    gameUrl: 'https://gn-math.github.io/bloons-td-4/'
  },
  {
    id: 'bloons-td-5',
    title: 'Bloons TD 5',
    category: 'Strategy',
    description: 'The fifth installment of the tower defense series.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bloons-td-5.png',
    gameUrl: 'https://gn-math.github.io/bloons-td-5/'
  },
  {
    id: 'bloons-tower-defense',
    title: 'Bloons Tower Defense',
    category: 'Strategy',
    description: 'The original tower defense game with balloons.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bloons-tower-defense.png',
    gameUrl: 'https://gn-math.github.io/bloons-tower-defense/'
  },
  {
    id: 'bob-the-robber-2',
    title: 'Bob the Robber 2',
    category: 'Adventure',
    description: 'Help Bob the robber pull off his next big heist.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/bob-the-robber-2.png',
    gameUrl: 'https://gn-math.github.io/bob-the-robber-2/'
  },
  {
    id: 'boxing-random',
    title: 'Boxing Random',
    category: 'Sports',
    description: 'A wacky and unpredictable boxing game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/boxing-random.png',
    gameUrl: 'https://gn-math.github.io/boxing-random/'
  },
  {
    id: 'brawl-stars',
    title: 'Brawl Stars',
    category: 'Action',
    description: 'A fast-paced multiplayer combat game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/brawl-stars.png',
    gameUrl: 'https://gn-math.github.io/brawl-stars/'
  },
  {
    id: 'burrito-bison',
    title: 'Burrito Bison',
    category: 'Action',
    description: 'Launch Burrito Bison to escape Candy Land.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/burrito-bison.png',
    gameUrl: 'https://gn-math.github.io/burrito-bison/'
  },
  {
    id: 'cannon-basketball-4',
    title: 'Cannon Basketball 4',
    category: 'Sports',
    description: 'Shoot basketballs from a cannon to score.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/cannon-basketball-4.png',
    gameUrl: 'https://gn-math.github.io/cannon-basketball-4/'
  },
  {
    id: 'cars-simulator',
    title: 'Cars Simulator',
    category: 'Driving',
    description: 'Drive various cars in a simulated environment.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/cars-simulator.png',
    gameUrl: 'https://gn-math.github.io/cars-simulator/'
  },
  {
    id: 'chess',
    title: 'Chess',
    category: 'Strategy',
    description: 'The classic game of strategy and skill.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/chess.png',
    gameUrl: 'https://gn-math.github.io/chess/'
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    category: 'Strategy',
    description: 'Click the cookie to bake more cookies.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/cookie-clicker.png',
    gameUrl: 'https://gn-math.github.io/cookie-clicker/'
  },
  {
    id: 'crossy-road',
    title: 'Crossy Road',
    category: 'Action',
    description: 'Help the chicken cross the road safely.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/crossy-road.png',
    gameUrl: 'https://gn-math.github.io/crossy-road/'
  },
  {
    id: 'cut-the-rope',
    title: 'Cut the Rope',
    category: 'Puzzle',
    description: 'Cut the rope to feed Om Nom candy.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/cut-the-rope.png',
    gameUrl: 'https://gn-math.github.io/cut-the-rope/'
  },
  {
    id: 'death-run-3d',
    title: 'Death Run 3D',
    category: 'Action',
    description: 'A fast-paced 3D running game with obstacles.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/death-run-3d.png',
    gameUrl: 'https://gn-math.github.io/death-run-3d/'
  },
  {
    id: 'doodle-jump',
    title: 'Doodle Jump',
    category: 'Action',
    description: 'Jump as high as you can in this classic game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/doodle-jump.png',
    gameUrl: 'https://gn-math.github.io/doodle-jump/'
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    category: 'Driving',
    description: 'Drift your way to the top in this racing game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/drift-hunters.png',
    gameUrl: 'https://gn-math.github.io/drift-hunters/'
  },
  {
    id: 'drive-mad',
    title: 'Drive Mad',
    category: 'Driving',
    description: 'Drive through challenging tracks and obstacles.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/drive-mad.png',
    gameUrl: 'https://gn-math.github.io/drive-mad/'
  },
  {
    id: 'duck-life-4',
    title: 'Duck Life 4',
    category: 'Adventure',
    description: 'Train your duck to become a champion racer.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/duck-life-4.png',
    gameUrl: 'https://gn-math.github.io/duck-life-4/'
  },
  {
    id: 'eggy-car',
    title: 'Eggy Car',
    category: 'Driving',
    description: 'Drive a car with an egg on top and don\'t drop it.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/eggy-car.png',
    gameUrl: 'https://gn-math.github.io/eggy-car/'
  },
  {
    id: 'elastic-man',
    title: 'Elastic Man',
    category: 'Action',
    description: 'A fun and weird game about an elastic man.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/elastic-man.png',
    gameUrl: 'https://gn-math.github.io/elastic-man/'
  },
  {
    id: 'ev-io',
    title: 'EV.IO',
    category: 'Action',
    description: 'A fast-paced multiplayer FPS game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/ev-io.png',
    gameUrl: 'https://gn-math.github.io/ev-io/'
  },
  {
    id: 'evil-glitch',
    title: 'Evil Glitch',
    category: 'Action',
    description: 'A retro-style action game with a glitchy twist.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/evil-glitch.png',
    gameUrl: 'https://gn-math.github.io/evil-glitch/'
  },
  {
    id: 'fact-or-opinion',
    title: 'Fact or Opinion',
    category: 'Puzzle',
    description: 'Test your knowledge by distinguishing facts from opinions.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/fact-or-opinion.png',
    gameUrl: 'https://gn-math.github.io/fact-or-opinion/'
  },
  {
    id: 'fancy-pants',
    title: 'Fancy Pants',
    category: 'Adventure',
    description: 'The classic platformer game with fancy pants.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/fancy-pants.png',
    gameUrl: 'https://gn-math.github.io/fancy-pants/'
  },
  {
    id: 'fireboy-and-watergirl',
    title: 'Fireboy and Watergirl',
    category: 'Puzzle',
    description: 'Help Fireboy and Watergirl solve puzzles together.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/fireboy-and-watergirl.png',
    gameUrl: 'https://gn-math.github.io/fireboy-and-watergirl/'
  },
  {
    id: 'friday-night-funkin',
    title: 'Friday Night Funkin',
    category: 'Action',
    description: 'A rhythm game where you battle in rap duels.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/friday-night-funkin.png',
    gameUrl: 'https://gn-math.github.io/friday-night-funkin/'
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    category: 'Action',
    description: 'Jump and fly your way through danger in this rhythm-based platformer.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/geometry-dash.png',
    gameUrl: 'https://gn-math.github.io/geometry-dash/'
  },
  {
    id: 'google-snake',
    title: 'Google Snake',
    category: 'Classic',
    description: 'The classic snake game from Google.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/google-snake.png',
    gameUrl: 'https://gn-math.github.io/google-snake/'
  },
  {
    id: 'granny',
    title: 'Granny',
    category: 'Adventure',
    description: 'A horror game where you must escape from Granny\'s house.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/granny.png',
    gameUrl: 'https://gn-math.github.io/granny/'
  },
  {
    id: 'happy-wheels',
    title: 'Happy Wheels',
    category: 'Action',
    description: 'A physics-based racing game with a dark twist.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/happy-wheels.png',
    gameUrl: 'https://gn-math.github.io/happy-wheels/'
  },
  {
    id: 'hole-io',
    title: 'Hole.io',
    category: 'Action',
    description: 'Consume everything in your path as a black hole.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/hole-io.png',
    gameUrl: 'https://gn-math.github.io/hole-io/'
  },
  {
    id: 'idle-breakout',
    title: 'Idle Breakout',
    category: 'Strategy',
    description: 'An idle game based on the classic breakout game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/idle-breakout.png',
    gameUrl: 'https://gn-math.github.io/idle-breakout/'
  },
  {
    id: 'impossible-quiz',
    title: 'Impossible Quiz',
    category: 'Puzzle',
    description: 'Test your knowledge with this impossible quiz.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/impossible-quiz.png',
    gameUrl: 'https://gn-math.github.io/impossible-quiz/'
  },
  {
    id: 'iron-snout',
    title: 'Iron Snout',
    category: 'Action',
    description: 'A fast-paced combat game featuring a pig.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/iron-snout.png',
    gameUrl: 'https://gn-math.github.io/iron-snout/'
  },
  {
    id: 'jacksmith',
    title: 'Jacksmith',
    category: 'Strategy',
    description: 'Craft weapons for your warriors in this strategy game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/jacksmith.png',
    gameUrl: 'https://gn-math.github.io/jacksmith/'
  },
  {
    id: 'jetpack-joyride',
    title: 'Jetpack Joyride',
    category: 'Action',
    description: 'Fly as far as you can with your jetpack.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/jetpack-joyride.png',
    gameUrl: 'https://gn-math.github.io/jetpack-joyride/'
  },
  {
    id: 'krunker',
    title: 'Krunker',
    category: 'Action',
    description: 'A fast-paced multiplayer FPS game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/krunker.png',
    gameUrl: 'https://gn-math.github.io/krunker/'
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    category: 'Adventure',
    description: 'Explore and build in this blocky world.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/minecraft.png',
    gameUrl: 'https://gn-math.github.io/minecraft/'
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Driving',
    description: 'A fast-paced motorcycle racing game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/moto-x3m.png',
    gameUrl: 'https://gn-math.github.io/moto-x3m/'
  },
  {
    id: 'ovo',
    title: 'OvO',
    category: 'Action',
    description: 'A fast-paced platformer game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/ovo.png',
    gameUrl: 'https://gn-math.github.io/ovo/'
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2',
    category: 'Action',
    description: 'Conquer territory in this multiplayer game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/paper-io-2.png',
    gameUrl: 'https://gn-math.github.io/paper-io-2/'
  },
  {
    id: 'plants-vs-zombies',
    title: 'Plants vs Zombies',
    category: 'Strategy',
    description: 'Defend your home from zombies with plants.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/plants-vs-zombies.png',
    gameUrl: 'https://gn-math.github.io/plants-vs-zombies/'
  },
  {
    id: 'polytrack',
    title: 'PolyTrack',
    category: 'Driving',
    description: 'A fast-paced racing game with low-poly graphics.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/polytrack.png',
    gameUrl: 'https://gn-math.github.io/polytrack/'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: 'Sports',
    description: 'A retro-style American football management game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/retro-bowl.png',
    gameUrl: 'https://gn-math.github.io/retro-bowl/'
  },
  {
    id: 'run-3',
    title: 'Run 3',
    category: 'Action',
    description: 'Run and jump through space in this classic game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/run-3.png',
    gameUrl: 'https://gn-math.github.io/run-3/'
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    description: 'Roll down the slope and avoid obstacles.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/slope.png',
    gameUrl: 'https://gn-math.github.io/slope/'
  },
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    category: 'Driving',
    description: 'A fast-paced multiplayer kart racing game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/smash-karts.png',
    gameUrl: 'https://gn-math.github.io/smash-karts/'
  },
  {
    id: 'snow-rider-3d',
    title: 'Snow Rider 3D',
    category: 'Driving',
    description: 'Ride your sled down the snowy mountain.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/snow-rider-3d.png',
    gameUrl: 'https://gn-math.github.io/snow-rider-3d/'
  },
  {
    id: 'stickman-hook',
    title: 'Stickman Hook',
    category: 'Action',
    description: 'Swing your way to the finish line as a stickman.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/stickman-hook.png',
    gameUrl: 'https://gn-math.github.io/stickman-hook/'
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    category: 'Action',
    description: 'Run as far as you can in this classic endless runner.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/subway-surfers.png',
    gameUrl: 'https://gn-math.github.io/subway-surfers/'
  },
  {
    id: 'temple-run-2',
    title: 'Temple Run 2',
    category: 'Action',
    description: 'Escape from the temple in this classic endless runner.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/temple-run-2.png',
    gameUrl: 'https://gn-math.github.io/temple-run-2/'
  },
  {
    id: 'tetris',
    title: 'Tetris',
    category: 'Puzzle',
    description: 'The classic game of falling blocks.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/tetris.png',
    gameUrl: 'https://gn-math.github.io/tetris/'
  },
  {
    id: 'tiny-fishing',
    title: 'Tiny Fishing',
    category: 'Sports',
    description: 'Catch as many fish as you can in this fun game.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/tiny-fishing.png',
    gameUrl: 'https://gn-math.github.io/tiny-fishing/'
  },
  {
    id: 'tunnel-rush',
    title: 'Tunnel Rush',
    category: 'Action',
    description: 'Rush through the tunnel and avoid obstacles.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/tunnel-rush.png',
    gameUrl: 'https://gn-math.github.io/tunnel-rush/'
  },
  {
    id: 'vex-7',
    title: 'Vex 7',
    category: 'Action',
    description: 'The seventh installment of the Vex series.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/vex-7.png',
    gameUrl: 'https://gn-math.github.io/vex-7/'
  },
  {
    id: 'world-guessr',
    title: 'World Guessr',
    category: 'Puzzle',
    description: 'Guess the location based on the street view.',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/world-guessr.png',
    gameUrl: 'https://gn-math.github.io/world-guessr/'
  },
  {
    id: 'worlds-hardest-game',
    title: 'Worlds Hardest Game',
    category: 'Puzzle',
    description: 'The worlds hardest game, can you beat it?',
    coverUrl: 'https://raw.githubusercontent.com/gn-math/covers/main/worlds-hardest-game.png',
    gameUrl: 'https://gn-math.github.io/worlds-hardest-game/'
  }
];

export const CATEGORIES: Category[] = ['All', 'Action', 'Sports', 'Puzzle', 'Strategy', 'Adventure', 'Driving', 'Classic'];
