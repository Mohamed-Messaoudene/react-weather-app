# react weather app
  <div>
   <img src="https://github.com/user-attachments/assets/474705dc-8e43-4c09-829c-70589577c044" width="48%" height="300px" />
   <img src="https://github.com/user-attachments/assets/7792256a-4c0e-4f3f-a383-5f7fa7ccfd90" width="48%" height="300px" />
  </div>

  [Live Demo](https://mohamed-messaoudene.github.io/react-weather-app/)

## Features
   - Weather forecast for any city or place
   - Extended 5 days forecast
   - Find user location weather by utilizing GeolocationAPI
   - One-click Celcius to Fahrenheit conversion and vice versa
   - Light/Dark Mode
## Getting started
First you need :
   - an API key from [OpenWeatherMap](https://openweathermap.org/), you can get one by creating an account on their website........API_KEY_1
   - an API key from [opencagedata](https://api.opencagedata.com/), you can get one by creating an account on their website.........API_KEY_2

After you got your API keys, create a .env file at root directory of project, copy the two lines below to the file and replace YOUR_KEY_1 and YOUR_KEY_2 with your API Keys.
```
   VITE_OPENWEATHERMAP_API_KEY=YOUR_API_KEY_1
   VITE_OPENCAGEDATA_API_KEY = YOUR_API_KEY_2

```

Finally clone this repository, install dependencies and run the local server
```
git clone https://github.com/Mohamed-Messaoudene/react-weather-app.git

```
```
  cd react-weather-app
  npm install
  npm start

```

## Technical aspect
In this project, I have learned a lot, including:

   - **How React Organizes Projects:** I learned how React organizes projects by dividing them into many components, making the codebase modular and easier to manage.

   - **Simplifying Code with Material-UI:** The Material-UI library significantly simplifies coding by providing a wide range of pre-built components that can be easily customized to fit the application's needs.

   - **State Management with React Hooks:** I gained experience managing the state of components using React hooks such as useState, useEffect, useContext, and others.

   - **Writing Custom Hooks:** I learned how to write custom hooks to simplify tasks, making the code cleaner and more reusable.

   - **Fetching Data with SWR:** I explored fetching data from APIs using the powerful SWR library, which enhances the efficiency and simplicity of data fetching in React.

   - **Implementing Light/Dark Mode:** I discovered how simple it is to implement light and dark modes in an application using React and Material-UI.

   - **Building Responsive UIs:** I learned how to make the app responsive across different devices and screen sizes with React and Material-UI.
