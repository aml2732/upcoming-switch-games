# Upcoming Switch Games
- `npm start`: Run application in development mode
- `npm run build` : builds prod ready /build dir outputs
- (new terminal window) `npm run backend`: to run the server
- ` DATABASE_URL=<PG connection string> node admin` : run the admin server (totally not even remotely working yet)

# API :
- `http://localhost:5000/games/list` : lists games in system

# ADMIN API
- `http://localhost:5001/games/newimage` (POST) new (DONE)
- `http://localhost:5001/games/gamesImageList` helper so I can see the state of the db
- `http://localhost:5001/games/getImage/:id` fetch a single image from the db

# Demo:
[https://powerful-refuge-64756.herokuapp.com/](https://powerful-refuge-64756.herokuapp.com/)
