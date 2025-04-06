# CS 260 Notes

[My startup](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## HTML Notes

There are some sections for THML such as head, hearder, body, main, footer. Those sections represents each location. 
div and span is different usage in terms of block and inline. If it is block, it can be only that element but inline can line up horizontaly. 
I used two type of input element, input and textare. 
There are also useful element such as Button and a tag. Button is leterally button, while a is able to contain link with words that I input inside a tag.


## CSS Notes
I used display: flex; to align elements properly. header, main, and footer were styled to create a clear structure.Margin, padding, and border were adjusted to make sure elements are not too close or overlapping.
I changed the font size and color to make the page easy to read. Background colors were also applied to different sections.
Styled button to make it stand out. input and textarea were adjusted for better usability.
When the user hovers over a button, the background color changes to give feedback.
Used max-width and percentage-based widths so the layout adapts to different screen sizes.

## React1
-React uses componets so I do not need to add navbar for every page, as well as footer. BrowserRouter is changeing Routes componet. Only what is inside of Route tag is changed so other element of app.jsx will stay the same. 
-I can use BootStrap for CSS. It is acually better for this project since I do not need to have css folder and file. 
-In React, there is a way to creat a Form by using Form.Group and Form.control. There is Table also.

## React2
-useState: useState allows managing state within a React component. It helps store and update values dynamically without reloading the page. This is useful for handling user input, toggling elements, and managing lists.
-useEffect: useEffect is used for handling side effects in a React component. It runs after the component renders and can be used for fetching data, updating local storage, or listening to events. It also allows cleanup actions, preventing memory leaks when components unmount.
-Practical Application: useState is useful for tracking form inputs, managing task lists, or updating UI elements dynamically.
-useEffect is helpful for persisting data with localStorage, handling API calls, or synchronizing UI with external changes.

# Service
-Express.js: Express.js is a minimal and flexible Node.js framework for building web applications and APIs. It simplifies handling HTTP requests, routing, and middleware integration. It is widely used for creating backend services that communicate with databases and frontend applications.
-REST API Endpoints: RESTful APIs allow communication between the frontend and backend using HTTP methods such as GET, POST, PATCH, and DELETE. Each endpoint serves a specific function, such as retrieving, creating, updating, or deleting data.
-Data Persistence: Server-side applications often store and retrieve data from databases or in-memory storage. JSON format is commonly used for data exchange between the server and client.
-Practical Application: Express.js is useful for setting up backend servers, handling authentication, and managing API routes.
-REST API endpoints help in fetching user data, saving journal entries, managing schedules, and updating tasks dynamically.
-Data persistence allows users to store and retrieve their information efficiently, ensuring seamless interaction with the application.


# startupDB
-Learned how to use MongoDB Atlas to store and manage data in the cloud
-Understood the concept of data persistence and how it enables long-term storage of user data
-Realized the importance of using JSON format for efficient communication between client and server
-Gained experience in designing RESTful API endpoints (GET, POST, PATCH, DELETE) for database interaction
-Learned how each API endpoint corresponds to specific actions like creating, retrieving, updating, or deleting data
-Discovered how Express.js integrates with MongoDB to build flexible and scalable backend services
-Understood the role of REST APIs in connecting the frontend with the backend for dynamic data handling
-Learned how to manage user sessions and authentication using server-side logic with database support
-Recognized the value of separating concerns between the frontend UI and backend logic through API communication
-Developed a deeper understanding of full-stack architecture by linking user actions to database operations via Express and MongoDB

# Websocket
-Learned how WebSocket enables real-time, full-duplex communication between client and server over a single persistent connection
-Understood the difference between HTTP (request-response) and WebSocket (event-driven messaging)
-Discovered how to use the WebSocket API in JavaScript to open connections, send messages, and receive updates
-Gained experience in setting up a WebSocket server using the ws package in Node.js
-Learned how to send and receive messages between client and server using .send() and .onmessage handlers
-Recognized the importance of configuring Nginx to support WebSocket upgrades using proxy_http_version 1.1 and Upgrade headers
-Learned how to debug WebSocket connections using the browser’s developer tools (Network tab > WS)
-Understood how WebSocket connections are initiated from the frontend using wss:// or ws:// based on protocol
-Integrated WebSocket functionality into an existing app (Life Hack Journal) to display server-sent messages in real time
-Gained a deeper appreciation of real-time communication patterns, which are essential for features like notifications, chats, and live updates in modern web apps