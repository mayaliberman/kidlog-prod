# kidlog-prod

## Introduction

Kidlog app is a fullstack webapp for parents who want to documents their children's progress in https://stages.academy/ online course.

The app is live in heroku server: https://www.kidlog.app/
user: test@example.com
pass: pass1234

## Technologies and Libraries

### API

- Node.js
- Express
- Mongoose
- MongoDB
- Multer
- Bcrypt
- Cloudinary
- Basic-auth

### Client

- Reactjs
- HTML5
- CSS Modules
- Axios
- Formik
- Yup

## Main Screens

Main feed having the data from the mongoDB database as well as default photo from Unsplash API in case the user didn't upload a photo. All the routes except the login and the signup are private routes which are authenticated and authorized by the API and client.

![Image of main post feed](https://res.cloudinary.com/dzv97uspj/image/upload/v1599583874/kidlog/omduuqd1z11uytzdefj7.png)

The user is able to add and edit post, and also preview the uploaded image on the form before submitting the post. On the client the fields are validated by Yup library, which enables us to ensure that the data sent to the API is validated correctly.

After submition of new post, a feedback modal appears to extract data from the user.

![Image of add or edit post](https://res.cloudinary.com/dzv97uspj/image/upload/v1599583571/kidlog/gfc8jrwkzp4ppnv79caq.png)

![Image of feedback after post submition](https://res.cloudinary.com/dzv97uspj/image/upload/v1599584590/kidlog/bq8sppvkg80hndsjha6u.png)

Sign up form is divided into two parts, the user account basic details and the list of children to add into the user/parent account. This list will be used on the post feed and the add/edit post.

![Image of sign up screen](https://res.cloudinary.com/dzv97uspj/image/upload/v1599583001/kidlog/vzicwh617wtrogzlxijt.png)

![Image of add kid screen](https://res.cloudinary.com/dzv97uspj/image/upload/v1599584156/kidlog/uoxr57ulorbq5yvf6uxu.png)

Acount area is divded into parts, the first one contains the user details, the second contains the childrens details. Both can be edited.

![Image of sign up screen](https://res.cloudinary.com/dzv97uspj/image/upload/v1599583838/kidlog/q4vnygiefvaeqywvizu6.png)
