# Shelf’d

Shelf’d is a personal bookshelf application built with React, Firebase, and external APIs.

I built this project in 2025 as part of my software engineering education. We had a lot of freedom in choosing what we wanted to build, and because I love reading and use Goodreads regularly, I wanted to explore how an application like that might work behind the scenes.

My goal was to build an application from end to end: create and store user data, work with external APIs, and turn that data into a functioning React application.

## What It Does

Users can:

- Search for books using the Google Books API
- View book information and covers
- Explore New York Times Best Seller data
- Browse a selection of book-related news
- Open individual articles and view the original published content
- Create an account and log in
- Add books to a personal digital bookshelf
- Remove books from their bookshelf

The bookshelf stores the IDs of books a user has added. Those IDs are then used to retrieve the corresponding book information and display the books as individual cards.

The news section follows a similar idea. Shelf’d stores the article information and uses the selected article's URL to load the original published content when the article is opened.

## Built With

- React
- JavaScript
- HTML
- CSS
- Firebase
- Axios
- Google Books API
- New York Times API

## A Few Things I Worked On

One of the main goals of Shelf’d was getting comfortable connecting different pieces of an application together.

I worked with:

- NoSQL data structures for user bookshelf data
- External APIs for book and bestseller information
- Firebase for storing application data
- Axios for making HTTP requests
- React Context for sharing the current user's state throughout the application
- React Router for navigation and route-based data loading
- Reusable React components for the frontend

One issue I encountered was that some book identifiers were not specific enough, which could result in the wrong book or cover being returned. I traced the problem back to the way I was making the API lookup and made the identifier and request more specific.

## Coming Back to Shelf’d

After letting the project sit for a while, I recently started using it again and testing it from a user's perspective.

Coming back to it with more experience has been useful because I can now look at some of the decisions I made in 2025 with a different perspective. I've already made several improvements based on that process, including:

- Redirecting users to the login page when they try to add a book without being signed in
- Removing the sign-up call to action when a user is already logged in
- Making additional UI improvements based on how the application behaves during regular use

## What I Learned

Shelf’d gave me a better understanding of how the different parts of a web application fit together.

I learned how to take data from an external API, work with it inside a React application, store user-specific information, and use that information to determine what gets displayed to the user.

Building the project around something I personally enjoy also made me more aware of the relationship between technical decisions and the experience of the person using the application.

## What I Would Work On Next

Shelf’d was built primarily to demonstrate end-to-end development and API integration, so there are several areas I would revisit if I continued developing it.

Some of those include:

- More robust authentication and security
- Pagination or incremental loading for larger sets of search results
- Additional UI and accessibility improvements
- Better loading and error states
- Personalized recommendations
- Reading progress tracking
- Reviews and sharing features
- Additional insights into reading habits

## About Me

I'm Hanna, a software engineer who enjoys building applications, working with data, and figuring out how all of the pieces of a system fit together.

GitHub: github.com/hannawhitney
