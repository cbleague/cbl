
# Ukrainian Christian Basketball League REST API
=======
## Demo
[Heroku Demo](http://sleepy-shore-7853.herokuapp.com/)
=======
##Features
* Express 
* Authentication

## List of Routes
* [Users](#users)
  - SignUp
  - SignIn
  - Change account
  - Administrator

* [Players](#players)
  - Register 
  - Search
  - Modify profile
  - Delete

* [Seasons](#seasons)
  - Create
  - Add/Remove Teams

* [Teams](#teams)
  - Create
  - Add/Remove Players
  - Search
  - Modify team info.
  - Delete

* [Games](#games)
  - Create
  - Delete

* [Table](#table)
  - Teams
  - Score
  - Allstats



--------------------------


### <a name="users"></a>**Users**

##### Sign Up
Anyone can sign-up with email and password. 
Password should be base64 encrypted.
Duplicated emails are not allowed.

```
API: /api/auth/signup/ 
METHOD: POST
INPUT: {email:'test', password: 'foobar123'}

```



##### Sign in
User can sign-in with email and password.
Incorrect emall or password will return error.
You have to use Basic HTTP Authorisation Request.
```
API: /api/auth/signin/ 
METHOD: GET
INPUT: {email:'test', password: 'ENCRYPTED'}
```



##### Change account
User can change email and password.
```
API: /api/auth/update/
Method: PUT
INPUT: {email:'test5', password: 'ENCRYPTED'}
```



##### Administrator

Admins could add admin role to another user
```
API: /api/auth/addadmin/ 
METHOD: POST 
INPUT: {email:'test'}
```

Admins could remove admin role
```
API: /api/auth/addadmin/ 
METHOD: PUT 
INPUT: {email:'test'}
```




-------------------------------

### <a name="players"></a>**Players**

##### Register
User can register players. No email duplicates.

For registering players, player's name(firstname, middlename, secondname), email, phone, date of birth, age, height, weight, position must be required.
Photo is optional.

```
API: /api/player/register 
METHOD: POST
INPUT: {firstname: 'test1', middlename: 'test', secondname: 'test', 
          email: 'test1@test.com', phone: 1234, dateOfBirth: 1234, 
          age: 20, height: 7, weight: 7, number: 7, position: 'test'}
```



##### Search
Get player by email.

```
API: /api/player/find/test@test.com
METHOD: GET
OUTPUT:  {firstname: 'test1', middlename: 'test', secondname: 'test', 
          email: 'test1@test.com', phone: 1234, dateOfBirth: 1234, 
          age: 20, height: 7, weight: 7, number: 7, position: 'test'}
```



##### Modify profile(update)
Update player information.

```
API: /api/player/update/test@test.com
METHOD: PUT
INPUT: {firstname: 'Albert'}
OUTPUT:  {firstname: 'Albert', middlename: 'test', secondname: 'test', 
            email: 'test1@test.com', phone: 1234, dateOfBirth: 1234, 
            age: 20, height: 7, weight: 7, number: 7, position: 'test'}
```



##### Delete
Delete player by email.

```
API: /api/player/delete/test@test.com
METHOD: delete

```





---------------------------------------


###<a name="seasons"></a> **Seasons**
Season includes season number, name, teams array, games array.


##### Create (Admin Only)
Create season.
To create Season, name, season number must be required.
```
API: /api/season/
METHOD: POST
INPUT: {seasonNumber: 9, name: '2014-2015'}
```



##### Add/Remove Teams (Admin Only)
Teams can be added or removed by season ID, team ID.
```
API: /api/season/addteam
METHOD: POST 
INPUT: {seasonId: seasonId, teamId: teamId}
```




-----------------------------------------


### <a name="teams"></a>**Teams**


##### Register
Teams change every seasons. So, ``Season`` must be created before creating team.
To register, name, division, season_objectID must be required and administrator, captian, coach, photo, logo are optional.

```
API: /api/team/registerteam
METHOD: POST
INPUT: {name: 'Timberwolves', division: 'A', season: seasonId}
```



##### Add/Remove Players

Players can be added or removed with player's name and objectID.
```
API: /api/team/addplayer
METHOD: PUT
INPUT: {name: 'Timberwolves', playerId: '507f1f77bcf86cd799439011'}
```
```
API: /api/team/removeplayer
METHOD: PUT
INPUT: {name: 'Timberwolves', playerId: '507f1f77bcf86cd799439011'}
```



##### Search

Teams can be searched by team name
```
API: /api/team/seeteam/Timberwolves
METHOD: PUT
```



##### Modify team info. (update)
Teams can be updated by team name
```
API: /api/team/updateteam/Timberwolves
METHOD: PUT
```



##### Delete

Teams can be deleted by team name
```
API: /api/team/deleteteam/Timberwolves
METHOD: delete
```




----------------------------------------

### <a name="games"></a>**Games**
Multiple games in a season.
So, a ``Season`` and two ``Teams`` must be created at least before creating a game.



##### Create
To create a game, two teams and location, date must be required.
If teams have a game on the day, it can't be created.

```
API: /api/game/create
METHOD: POST
INPUT: {seasonNumber:1, team1_name:'test1', team1_division:'A', team2_name:'test2', team2_division:'A', date:3456, location:'testlocation'}
```





--------------------------------


### <a name="table"></a>**Table**
It shows data of teams, scores or all status.
##### Teams
```
API: /api/table/teams
METHOD: GET
OUTPUT: {[teams array]}
```
##### Score
```
API: /api/table/scores
METHOD: GET
OUTPUT: {[Array with scores for every team]}
```
##### Allstats
```
API: /api/table/allstats
METHOD: GET
OUTPUT: {All season object}
```











