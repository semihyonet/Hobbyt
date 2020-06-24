# Hobbyt
This is a backend Node.JS project I made for a Hobby Sharing Social Media with MongoDB.

# Idea
What I designed this Node.js Application for is a very simple meeting people application. User signups and sets their profile with their hobbies. When the hobbies are set in place the applications checks if the hobbies are already in the system, if they are not registered in the system, a new category is created under that hobby name. This feature helps broadening the applications hobby library, in later updates I am planning to implement a blacklisted hobby list as well. Which will help the application be a user friendly community. 
Then the user will be registered under their hobbies and they will be shown to other people. What I imagined the next step of Signing up would be is finding people. Since this app is designed to be a social platform the user needs to find new people but the way to finding new people is not by searching their name unlike all of the current social medias. In this app you must find people by searching the hobbies. For example, when you search 'Table Tenis', every person who is registered under that hobby will show up. This approach will make messaging new people the norm and therefore making it less awkward and less challenging to talk to them. Since you are sharing a hobby its very easy and fun to talk to new people.

# How does this app work.
This aplication is built with Node.js and Express. There are specific routes set for multiple purposes. These routes corespond to multiple functions. This app was built with MongoDB Atlas. Also bcrpyt was used to encrypt passwords and JSON Web Tokken was used for authentication purposes. 

# Routes
- POST /signup
  - This signs up the user. It requires the following variables in JSON format for proceeding: 
  - username,password,email,hobbies,age,friends 
  - It sends JSON Web Token as a ressult. 
- POST /signin
  - This is for login attempts. It requires the following variables in JSON format for proceeding
  - username,password
  - It sends JSON Web Token as a ressult. 
- GET /
  - This sends profile details as a result.
- POST /friends
  - This is for adding a friend. This is pretty straightforward and one sided operation. If a user wants to add someone a friend it doesnt require approval from the person getting friended. This is because this app will value friendships and I dont want to complicate relations as if one adds someone as a friend and the other dont. Therefore creates a bad situation for the person who sended the friend request and also many people use the unfriending option or the declining a friend option to boost their ego and this app is not suited for those kind of behaviours. Since the one and only priority of this app is increasing comunication and creating a positive comunity, these kinds of behavior is not welcome and the aproach is to eliminate those capabilities.  
- GET /friends
  - This gets the current friend list.
- GET /hobbies
  - This is for recieving the Hobby list
- GET /hobbies/:hobbyname
  - This is for getting the people who has the same hobbies.
- GET /messages
  - Get the messages sent to you. Currently you recieve the messages sent by your friends kinda like tweets. But in later updates I plan to make it specific for people.
- POST /messages
  - You send a message. This opperation requires the following
  - content
  - It doesnt have any limits but I think I'll limit it in the future updates to a set amount like 500 letters.
