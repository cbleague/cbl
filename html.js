mainPage: 

header
  logo
  mainMenu
    Home
    Calendar 
    News
    Contacts 
    Create Team 
    Admin  
  login button,
  signup button,
footer


Partials: 

login
  email input field
  password input field
  login button

signup
  email input field
  password input field
  confirm password input field
  signup button

Home
  Division A label
  Tournament Table (same table as in old website, you can take dummy data from that 
table in order to create html and css for it)
  Division B label
  Same Tournament Table

Calendar
  You will get an array of two teams names, date, time, location and sometimes score
  We have to find a way to represent it

Contact
  contact info from old website

Create Team
  if user does not have a team, we will show only team form
    
    create team form (user shoul do it first)
      all fields from the team model
      "Create Team" button --> show team name (in a block befor player form 
with delete and edit icons)

    add player form
      all fields from the player model
      "Add To Team" button --> player(name and second name) appears in 
a block under team with edit and delete icons
      "Update" button (will appear when user click edit in player)

Admin:
  
  Create Season (somewhere in a coner, or just last position in list, 
because its gonna be once in a year):
    season name input
    season number input
    "Create Season" button

  Add Teams
    list of team names
    "Show Team" button in front each team --> will open full info of a 
team with full list of players and inner fields (EDITABLE!!!!!!)
    "Close Team" button --> close info of a team
    "Add Team To Season" --> adds team to season

  Add Game
    Choose Division field (A or B)
    Choose Team1 from a list
    Choose Team2 from a list
    Pick date
    Pick time
    Locatioin input field (could be string with address);
    "Add Game" button
  
  Add Score
    list of all games without score --> admin will peak one
    form
      team1 name label
      score input field
      team2 name label
      score input field
      "Add Score" button

  Change Table Manualy 
    our editable table - !!!SUX!!!
    "Save" button
    "Cancel" button


