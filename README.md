# Bruin Share
- Life under covid-19 hasn't been easy for everyone. With everything happening overtime, Bruins might find it difficult to share their stroies during these special days of qurantine. Everything looks nice and intact on Facebook and Instagram Stories, but it is hard to find a platform to share Bruins' unkown stories.

- Bruin Share is dedicated to be a safe place for Bruins to share covid-related stories. Being an online platform specific for Bruins, Bruin Share encourages every Bruin to share their stories to their fellow schoolmates and alumni. By using Bruin Shares, Bruins can share posts, react to posts, get to know fellow Bruins around the world.

## Authors
Tristan Que, Donghang Wu, Zhentong Liu, Hongye Li, Olivia Zhang

## Running the Application
Follow the below instructions to set up our project on your local machine.

# Prerequisites
To run this project, you'll need the following NPM installed.

Node Package Manager (NPM): v16.14.5 https://www.npmjs.com/

## Set up for Server
```
cd ./Bruin-Share-Backend
npm install
npm run start
```
## Set up for Server
```
cd ./Bruin-Share-Frontend
npm install
npm start
```
Now go to http://localhost:3000/
## Deployed Demo

https://bruin-share.netlify.app/


## Features

- **Automatic Location Display:**  \
No matter where you are, you can always find fellow bruins who live near you and read their story

  <img src="./Bruin-Share-Frontend/demo/landing.gif" alt="landing" style="zoom:80%;"/>



- **Minimalistic Forums:** \
Tired of Facebook and Reddit's forums with arbitrary ads and random tools you never used, we kept our app very simple with all necessary features

  <img src="./Bruin-Share-Frontend/demo/public.png" alt="image-20201206105700875" style="zoom:25%;"/>



- **Search the story you like:** \
Smart search based on topics and contents, find the post you've never forgot

  <img src="./Bruin-Share-Frontend/demo/search.gif" alt="search" style="zoom:100%;" />



- **Join Us in two steps:** \
Quick login and Sign up with info verification

  <p float="left">
    <img src="./Bruin-Share-Frontend/demo/signup.png" alt="signup" width="300" />
    <img src="./Bruin-Share-Frontend/demo/login.png" alt="login" width="300"  />
  </p>

- **Endorse your peer and let them hear you**: \
Give quick comments and likes on posts you like

  <img src="./Bruin-Share-Frontend/demo/post.gif" alt="post"  />



- **Get to Know your peers**: \
Each user has a profile page and a customizable private page

<p float="left">
  <img src="./Bruin-Share-Frontend/demo/profile.png" width="300"/>
  <img src="./Bruin-Share-Frontend/demo/private.png"  width="300"/>
</p>

- **We helped you keep track of what you might miss:** \
Notification reminds you of unread likes and comments

<img src="./Bruin-Share-Frontend/demo/notification.png" alt="notification" width="500"/>


## Tech Stack

**Frontend**

- React / React Hooks
- Google Map Api
- Styled Components 
- Material UI core / icons
- Moment.js
- Axios
- Netlify (Deployment)



**Backend**

- MongoDB Atalas
- Express
- Node.js
- Cloudinary
- JWT & Bcrypt
- Heroku (Deployment)



**UI**

- Figma
