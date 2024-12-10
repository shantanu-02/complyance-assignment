# Documentation

## Multi-country support and Role-Based Acces control project

The goal is to enhance the application with multi-country functionality where users can select a country, and the data they work with is tagged with that country. The country selection should persist across sessions, and role-based access should ensure that Admins have full data management capabilities, while Viewers only have read-only access to data related to their assigned country.

## Features

- User Country Selection & Persistence 
- Role-Based Access Control 
- Data Creation 
- Country Tagging
- Country Management for Admin

## Prerequisites

- Typescript
- Next.js
- ReactJs
- JTailwind CSS

## Getting Started

First, clone the project:

Second, use the following command in terminal to start the development server

```bash
npm run dev
```

## Usage

### Frontend URLs

#### Fetch user stories
- URL: "/"
- To fetch and display posts as per user's country preference
  
#### Register user
- URL: "/register"
- To register the user
  
#### Login user
- URL: "/login"
- To log in the user in app

#### Logout user
- URL: "/logout"
- To log out the user

#### Fetch users for management: Admin only
- URL: "/users"
- To fetch and display posts as per user's country preference

#### Fetch users own posts only
- URL: "/ownposts"
- To fetch and display users own posts

## API Endpoints

#### Endpoint: /api/auth/login
- for logging user in
- Method: POST
  
#### Endpoint: /api/auth/register/
- Feor registration of user
- Method: POST
  
#### Endpoint: /api/[username]/fetch
- Fetches all the users posts
- Method: GET
  
#### Endpoint: /api/stories/[id]/update-country
- ADMIN : For updating user posts's country
- Method: PUT
  
#### Endpoint: /api/stories/[id]
- For updating and deletring current users post
- Method: PUT and DELETE
  
#### Endpoint: /api/stories/fetch
- For fetching posts based on user's preference
- Method: GET
  
#### Endpoint: /api/stories/story
- For creating user post
- Method: POST
  
#### Endpoint: /api/user/[id]
- ADMIN : For managing all the users country preferences
- Method: PUT and DELETE
  
#### Endpoint: /api/user/data
- For fetching users additional data based on authentication token
- Method: GET
  
#### Endpoint: /api/user/users
- For fetching all the `Viewer` users
- Method: GET
  
---
