# Bruin-Share-Backend

## First time run the service:

```
npm install
```

## how to run the service:

```
npm run dev
```

<br/>
<br/>


# REST API Documentation

# -----------------Authenticatio routes-------------------------------

## post /signup
### Header: none
### parameters:  
```
'name','email',password'
```
### response:
```
success: "successfully created user ",
result: {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5faf8093db4fab236864b0b8",
    "name": "test12",
    "email": "test12@gmail.com",
  }
```

## post /login
### Header: none
### parameters:  
```
'email',password'
```
### response:
```
 "mytoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZiNWE0ZjA1M2ZjZWEzZDg4ODdkYzAyIiwiaWF0IjoxNjA1NzM5ODEwfQ.KQno0O7AwF8_tJRlCQ3avVa9r2ETB5S8GEhi2lCHgOY",
  "userinfo": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fb5a4f053fcea3d8887dc02",
    "name": "admin",
    "email": "admin@gmail.com",
    "__v": 0
  }
```
<br>



# ----------------------view posts routes--------------------------------


## get /publicposts
#### everypost with detailed information
### Header: none
### request body: none
### response: 
#### data type: array
```
[
  {
    "comments": [
      {
        "_id": "5fbf127f0ec6450017ab8b0a",
        "text": "This is test 5 comment",
        "commentBy": {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fabc74c55ca9811782b5f3e",
          "name": "test5",
          "email": "test5@gmail.com"
        },
        "createdAt": "2020-11-26T02:27:11.397Z",
        "updatedAt": "2020-11-26T02:27:11.397Z",
        "__v": 0
      }
    ],
    "likes": [],
    "newcomments": [
      {
        "_id": "5fbf127f0ec6450017ab8b0a",
        "text": "This is test 5 comment",
        "commentBy": {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fabc74c55ca9811782b5f3e",
          "name": "test5",
          "email": "test5@gmail.com"
        },
        "createdAt": "2020-11-26T02:27:11.397Z",
        "updatedAt": "2020-11-26T02:27:11.397Z",
        "__v": 0
      }
    ],
    "newlikes": [],
    "lat": "69.068920",
    "lng": "-132.445183",
    "_id": "5fbeff9226ed0616b0d42724",
    "content": "second contents for updated name",
    "topic": "second post",
    "postBy": {
      "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
      "_id": "5fb5a4f053fcea3d8887dc02",
      "name": "updated name"
    },
    "createdAt": "2020-11-26T01:06:26.442Z",
    "updatedAt": "2020-11-26T02:27:11.419Z",
    "__v": 0
  }
]
```
## get /post/:postid
#### view a single post with detailed information
### Header: none
### request body: none
### response: 
#### data type: object
```
 {
    "comments": [
      {
        "_id": "5fbf127f0ec6450017ab8b0a",
        "text": "This is test 5 comment",
        "commentBy": {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fabc74c55ca9811782b5f3e",
          "name": "test5",
          "email": "test5@gmail.com"
        },
        "createdAt": "2020-11-26T02:27:11.397Z",
        "updatedAt": "2020-11-26T02:27:11.397Z",
        "__v": 0
      }
    ],
    "likes": [],
    "newcomments": [
      {
        "_id": "5fbf127f0ec6450017ab8b0a",
        "text": "This is test 5 comment",
        "commentBy": {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fabc74c55ca9811782b5f3e",
          "name": "test5",
          "email": "test5@gmail.com"
        },
        "createdAt": "2020-11-26T02:27:11.397Z",
        "updatedAt": "2020-11-26T02:27:11.397Z",
        "__v": 0
      }
    ],
    "newlikes": [],
    "lat": "69.068920",
    "lng": "-132.445183",
    "_id": "5fbeff9226ed0616b0d42724",
    "content": "second contents for updated name",
    "topic": "second post",
    "postBy": {
      "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
      "_id": "5fb5a4f053fcea3d8887dc02",
      "name": "updated name"
    },
    "createdAt": "2020-11-26T01:06:26.442Z",
    "updatedAt": "2020-11-26T02:27:11.419Z",
    "__v": 0
  }
```


## get /myposts
####  view everypost with logged in user
### Header: Authorization: Bearer +AuthToken
### request body: none
### response: 
#### data type: array
```
data format similar to public posts
```

## get /userposts/:userid
####  view the specific user's posts
### Header: none
### request body: none
### response: 
#### data type: array
```
data format similar to public posts
```

<br/>

# ------------------create/editing posts--------------------

## post /createpost
### Header: Authorization: Bearer +AuthToken
### request body:
```
    "topic":" this is topic",
    "image": "optional",
    "content":"contesnts ",
    "lng":"123",
    "lat":"123"
```
### response:
```
  "likes": [],
  "newlikes": [],
  "_id": "5faf81d3db4fab236864b0b9",
  "content": "contesnts ",
  "topic": " this is topic",
  "postBy": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fa5e2679cb98f02acac92d2",
    "name": "test2",
    "email": "test2@gmail.com",
    "__v": 0
  },
  "comments": [],
  "newcomments": [],
  "createdAt": "2020-11-14T07:05:55.986Z",
  "updatedAt": "2020-11-14T07:05:55.986Z"
```

## delete /deletepost
#### delete a post
### Header: Authorization: Bearer + authtoken
### request body:
```
"postid":"12312312"
```
### response:
```
"success": "remove successfully"
```

## get /editpost/:postid
#### return the origin post info for editing
### Header: Authorization: Bearer + authtoken
### request body: none
### response:
#### data type: object
```
{

  "_id": "5fb5abd65cff400c8ca0240d",
  "content": "3rd contents for admin posts3",
  "topic": "admin post3",
  "image":"",
  "postBy": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fb5a4f053fcea3d8887dc02",
    "name": "admin"
  }
}
```
## put /updatepost/:postid
#### updating the post information
### Header: Authorization: Bearer + authtoken
### request body:
```
"topic":  "optional",
"content":  "optional",
"image":  "optional"
```
### response:
#### data type object
#### updated post
```
shouldn't be used
```

# --------------------comments/likes routes--------------------

## put /comment
#### comment on a post
### Header: Authorization: Bearer + authtoken
### request body:
```
postid:   "1234334",
comment:  "comment content"
```
### response:
#### data type: object
```
 "likes": [],
  "newlikes": [],
  "_id": "5faf81d3db4fab236864b0b9",
  "content": "contesnts ",
  "topic": " this is topic",
  "postBy": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fa5e2679cb98f02acac92d2",
    "name": "test2",
    "email": "test2@gmail.com",
    "__v": 0
  },
  "comments": [],
  "newcomments": [],
  "createdAt": "2020-11-14T07:05:55.986Z",
  "updatedAt": "2020-11-14T07:05:55.986Z"
```

## put /deletecomment
#### delete a comment
### Header: Authorization: Bearer + authtoken
### request body:
```
postid: "123123",
commentid: "1231231"
```
### response:
#### data type: object
```
success:"remove comment successfully"
```

## put /like
#### like a post
### Header: Authorization: Bearer + authtoken
### request body:
```
postid: "1231231"
```
### response:
#### data type: object
```
"likes": [],
  "newlikes": [],
  "_id": "5faf81d3db4fab236864b0b9",
  "content": "contesnts ",
  "topic": " this is topic",
  "postBy": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fa5e2679cb98f02acac92d2",
    "name": "test2",
    "email": "test2@gmail.com",
    "__v": 0
  },
  "comments": [],
  "newcomments": [],
  "createdAt": "2020-11-14T07:05:55.986Z",
  "updatedAt": "2020-11-14T07:05:55.986Z"
```

## put /unlike
#### unlike a post
### Header: Authorization: Bearer + authtoken
### request body:
```
postid: "1231231"
```
### response:
#### data type: object
```
"likes": [],
  "newlikes": [],
  "_id": "5faf81d3db4fab236864b0b9",
  "content": "contesnts ",
  "topic": " this is topic",
  "postBy": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fa5e2679cb98f02acac92d2",
    "name": "test2",
    "email": "test2@gmail.com",
    "__v": 0
  },
  "comments": [],
  "newcomments": [],
  "createdAt": "2020-11-14T07:05:55.986Z",
  "updatedAt": "2020-11-14T07:05:55.986Z"
```


# ---------------Notification handling--------------------

## get /notification
#### get notifications
### Header: Authorization: Bearer + authtoken
### request body: none
### response:
#### data type: array
```
[
  {
    "newcomments": [
      {
        "_id": "5fbf127f0ec6450017ab8b0a",
        "text": "This is test 5 comment",
        "commentBy": {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fabc74c55ca9811782b5f3e",
          "name": "test5",
          "email": "test5@gmail.com"
        },
        "createdAt": "2020-11-26T02:27:11.397Z",
        "updatedAt": "2020-11-26T02:27:11.397Z",
        "__v": 0
      }
    ],
    "newlikes": [],
    "_id": "5fbeff9226ed0616b0d42724",
    "content": "second contents for updated name",
    "topic": "second post"
  },
  {
    "newcomments": [
      {
        "_id": "5fbead0fb085574734ac8053",
        "text": "check time stamp by comment admin",
        "commentBy": {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fb5abf25cff400c8ca0240e",
          "name": "comment admin",
          "email": "commentadmin@gmail.com"
        },
        "createdAt": "2020-11-25T19:14:23.091Z",
        "updatedAt": "2020-11-25T19:14:23.091Z",
        "__v": 0
      }
    ],
    "newlikes": [
      {
        "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
        "_id": "5fb5abf25cff400c8ca0240e",
        "name": "comment admin"
      },
      {
        "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
        "_id": "5fabc74c55ca9811782b5f3e",
        "name": "test5"
      },
      {
        "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
        "_id": "5fabc74c55ca9811782b5f3e",
        "name": "test5"
      },
      {
        "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
        "_id": "5fabc74c55ca9811782b5f3e",
        "name": "test5"
      }
    ],
    "_id": "5fb5abd65cff400c8ca0240d",
    "content": "changed1 for admin posts3",
    "topic": "changed1 admin post3"
  }
]
```


## put /deletenewlike
#### delete a single like notification
### Header: Authorization: Bearer + authtoken
### request body:
```
postid:"3212"
```
### response:
```
success:"delete like notification successfully"
```

## put /deletenewcomment
#### delete a single like notification
### Header: Authorization: Bearer + authtoken
### request body:
```
postid:"3212",
commentid:"323243"
```
### response:
```
success:"delete comment notification successfully"
```


# -------------------Searching--------------------------
## post /search
#### search on post conents/topic
### request body:
```
    "keyword":"contents ",
    "option":"content"
```
### response:
```
{
  "posts": [
    {
      "comments": [
        {
          "_id": "5fbf127f0ec6450017ab8b0a",
          "text": "This is test 5 comment",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fabc74c55ca9811782b5f3e",
            "name": "test5",
            "email": "test5@gmail.com"
          },
          "createdAt": "2020-11-26T02:27:11.397Z",
          "updatedAt": "2020-11-26T02:27:11.397Z",
          "__v": 0
        }
      ],
      "likes": [],
      "newcomments": [
        "5fbf127f0ec6450017ab8b0a"
      ],
      "newlikes": [],
      "lat": "69.068920",
      "lng": "-132.445183",
      "_id": "5fbeff9226ed0616b0d42724",
      "content": "second contents for updated name",
      "topic": "second post",
      "postBy": {
        "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
        "_id": "5fb5a4f053fcea3d8887dc02",
        "name": "updated name"
      },
      "createdAt": "2020-11-26T01:06:26.442Z",
      "updatedAt": "2020-11-26T02:27:11.419Z",
      "__v": 0,
      "score": 0.625
    }
  ]
}
```


# ---------------------User information----------------------
## get /myprofile
#### return the user profile for updating purpose
### Header: Authorization: Bearer + authtoken
### request body: none
### response:
```
{
  "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
  "_id": "5fb5a4f053fcea3d8887dc02",
  "name": "updated name",
  "email": "updated email",
  "__v": 0
}
```

## put /updateprofile
#### updating user's profile
### Header: Authorization: Bearer + authtoken
### request body:
```
"name":"optional",
"email":"optional",
"image":"optional"
```
### response:
```
{
  "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
  "_id": "5fb5a4f053fcea3d8887dc02",
  "name": "updated name",
  "email": "updated email",
  "__v": 0
}
```

## get /myinfo
#### return logged in user's profile and all posts
### Header: Authorization: Bearer + authtoken
### request body: none
### response:
#### data type; object
```
{
  "user": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fb5a4f053fcea3d8887dc02",
    "name": "updated name",
    "email": "updated email",
    "__v": 0
  },
  "posts": [
    {
      "comments": [
        {
          "_id": "5fbf127f0ec6450017ab8b0a",
          "text": "This is test 5 comment",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fabc74c55ca9811782b5f3e",
            "name": "test5",
            "email": "test5@gmail.com"
          },
          "createdAt": "2020-11-26T02:27:11.397Z",
          "updatedAt": "2020-11-26T02:27:11.397Z",
          "__v": 0
        }
      ],
      "likes": [],
      "newcomments": [
        "5fbf127f0ec6450017ab8b0a"
      ],
      "newlikes": [],
      "lat": "69.068920",
      "lng": "-132.445183",
      "_id": "5fbeff9226ed0616b0d42724",
      "content": "second contents for updated name",
      "topic": "second post",
      "postBy": "5fb5a4f053fcea3d8887dc02",
      "createdAt": "2020-11-26T01:06:26.442Z",
      "updatedAt": "2020-11-26T02:27:11.419Z",
      "__v": 0
    },
    {
      "comments": [
        {
          "_id": "5fbefc57ed2cea2c70a014bf",
          "text": "newest check by comment admin",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fb5abf25cff400c8ca0240e",
            "name": "comment admin",
            "email": "commentadmin@gmail.com"
          },
          "createdAt": "2020-11-26T00:52:39.357Z",
          "updatedAt": "2020-11-26T00:52:39.357Z",
          "__v": 0
        },
        {
          "_id": "5fbead0fb085574734ac8053",
          "text": "check time stamp by comment admin",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fb5abf25cff400c8ca0240e",
            "name": "comment admin",
            "email": "commentadmin@gmail.com"
          },
          "createdAt": "2020-11-25T19:14:23.091Z",
          "updatedAt": "2020-11-25T19:14:23.091Z",
          "__v": 0
        },
        {
          "_id": "5fbea8bef205b95b1863a0c1",
          "text": "final testing add comment scheme by comment admin",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fb5abf25cff400c8ca0240e",
            "name": "comment admin",
            "email": "commentadmin@gmail.com"
          },
          "createdAt": "2020-11-25T18:55:58.897Z",
          "updatedAt": "2020-11-25T18:55:58.897Z",
          "__v": 0
        }
      ],
      "likes": [
        {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fabc74c55ca9811782b5f3e",
          "name": "test5"
        }
      ],
      "newcomments": [],
      "newlikes": [
        "5fb5abf25cff400c8ca0240e",
        "5fabc74c55ca9811782b5f3e",
        "5fabc74c55ca9811782b5f3e",
        "5fabc74c55ca9811782b5f3e"
      ],
      "lat": "69.068920",
      "lng": "-132.445183",
      "_id": "5fb5abd65cff400c8ca0240d",
      "content": "changed1 for admin posts3",
      "topic": "changed1 admin post3",
      "postBy": "5fb5a4f053fcea3d8887dc02",
      "createdAt": "2020-11-18T23:18:46.785Z",
      "updatedAt": "2020-11-26T00:54:37.462Z",
      "__v": 0
    }
  ]
}
```


## get /userinfo/:userid
#### return the user profile and user's all posts
### Header: Authorization: Bearer + authtoken
### request body: none
### response:
#### data type; object
```
{
  "user": {
    "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
    "_id": "5fb5a4f053fcea3d8887dc02",
    "name": "updated name",
    "email": "updated email",
    "__v": 0
  },
  "posts": [
    {
      "comments": [
        {
          "_id": "5fbf127f0ec6450017ab8b0a",
          "text": "This is test 5 comment",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fabc74c55ca9811782b5f3e",
            "name": "test5",
            "email": "test5@gmail.com"
          },
          "createdAt": "2020-11-26T02:27:11.397Z",
          "updatedAt": "2020-11-26T02:27:11.397Z",
          "__v": 0
        }
      ],
      "likes": [],
      "newcomments": [
        "5fbf127f0ec6450017ab8b0a"
      ],
      "newlikes": [],
      "lat": "69.068920",
      "lng": "-132.445183",
      "_id": "5fbeff9226ed0616b0d42724",
      "content": "second contents for updated name",
      "topic": "second post",
      "postBy": "5fb5a4f053fcea3d8887dc02",
      "createdAt": "2020-11-26T01:06:26.442Z",
      "updatedAt": "2020-11-26T02:27:11.419Z",
      "__v": 0
    },
    {
      "comments": [
        {
          "_id": "5fbefc57ed2cea2c70a014bf",
          "text": "newest check by comment admin",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fb5abf25cff400c8ca0240e",
            "name": "comment admin",
            "email": "commentadmin@gmail.com"
          },
          "createdAt": "2020-11-26T00:52:39.357Z",
          "updatedAt": "2020-11-26T00:52:39.357Z",
          "__v": 0
        },
        {
          "_id": "5fbead0fb085574734ac8053",
          "text": "check time stamp by comment admin",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fb5abf25cff400c8ca0240e",
            "name": "comment admin",
            "email": "commentadmin@gmail.com"
          },
          "createdAt": "2020-11-25T19:14:23.091Z",
          "updatedAt": "2020-11-25T19:14:23.091Z",
          "__v": 0
        },
        {
          "_id": "5fbea8bef205b95b1863a0c1",
          "text": "final testing add comment scheme by comment admin",
          "commentBy": {
            "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
            "_id": "5fb5abf25cff400c8ca0240e",
            "name": "comment admin",
            "email": "commentadmin@gmail.com"
          },
          "createdAt": "2020-11-25T18:55:58.897Z",
          "updatedAt": "2020-11-25T18:55:58.897Z",
          "__v": 0
        }
      ],
      "likes": [
        {
          "image": "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
          "_id": "5fabc74c55ca9811782b5f3e",
          "name": "test5"
        }
      ],
      "newcomments": [],
      "newlikes": [
        "5fb5abf25cff400c8ca0240e",
        "5fabc74c55ca9811782b5f3e",
        "5fabc74c55ca9811782b5f3e",
        "5fabc74c55ca9811782b5f3e"
      ],
      "lat": "69.068920",
      "lng": "-132.445183",
      "_id": "5fb5abd65cff400c8ca0240d",
      "content": "changed1 for admin posts3",
      "topic": "changed1 admin post3",
      "postBy": "5fb5a4f053fcea3d8887dc02",
      "createdAt": "2020-11-18T23:18:46.785Z",
      "updatedAt": "2020-11-26T00:54:37.462Z",
      "__v": 0
    }
  ]
}
```
