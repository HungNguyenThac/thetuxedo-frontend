## folder building

```
src
|__ index.js
|__ app.js
|__ store.js (create Store)
|
|__ api
|   |__ axiosClient.js
|   |__ userApi.js
|   |__ ....
|
|__ action (redux)
|   |__ loading.js
|   |__ ....
|
|__ reducer (redux)
|   |__ rootReducer.js
|   |__ userReducer.js
|   |__ ....
|
|__ assets
|   |__ banner
|   |__ logo
|
|__ components share
|   |__ header
|   |__ footer
|   |__ loading
|   |__ ....
|
|__ features
|   |__ AoSoMi
|   |    |__ index.jsx
|   |    |__ components
|   |        |__ banner
|   |        |    |__ index.jsx
|   |        |    |__ style.scss
|   |        |
|   |        |__ pagination
|   |        |    |__ index.jsx
|   |        |    |__ style.scss
|   |        |__ renderAoSoMi
|   |             |__ index.jsx
|   |             |__ style.scss
|   |
|   |__ Detail
|   |    |__ index.jsx
|   |    |__ components
|   |        |__ bannerDetail
|   |        |    |__ index.jsx
|   |        |    |__ style.scss
|   |        |
|   |        |__ renderDetail
|   |             |__ index.jsx
|   |             |__ style.scss
|   |__ ....
|
|__ functionShare
|   |__ getCookie.js
|   |__ checkCookie.js
```
