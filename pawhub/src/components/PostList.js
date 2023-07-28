import React, { useEffect, useState } from 'react';
import PostCard from './PostCard'
import axios from 'axios';

import Example1 from "../images/DarthDogus.PNG";
import Example2 from "../images/Meow.jpg";
import Example3 from "../images/Pug.jpg";

function generateRandomImages() {
    // Function to generate an array of random images
    // You can modify this function to generate images as needed
    const images = [Example1, Example2, Example3];
    // Generate a random number from 0 to the total number of images
    const numImages = Math.floor(Math.random() * (images.length + 1));

    // Return an array of random images (including none if numImages is 0)
    return images.slice(0, numImages);
}

function generateRandomText() {
    // Function to generate random text for the post
    // You can modify this function to generate text as needed
    return "Random text for the post #" + Math.floor(Math.random() * 1000);
}

function PostList() {

const readFile = async(file) => {

    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
        const fileData = reader.result; // The data read from the file
        resolve(fileData);
        };
    
        reader.onerror = reject; //  In case of an error, reject the promise
    
        reader.readAsDataURL(file); // Start reading the file and convert it to a data URL
    });
    
    }

    const searchUsersReturnUsers = async (query) => {
    try {
        let response = await axios.get('https://pawhub.space/api/searchUsersReturnUsers', {
        params: query
        });
        return response.data;
    } catch (error) {
        console.error('Failed to search data', error);
    }
    };

    const searchPostsReturnPosts = async (query) => {
        try {
          let response = await axios.get('https://pawhub.space/api/searchPostsReturnPosts', {
            params: query
          });
          return response.data;
        } catch (error) {
          console.error('Failed to search data', error);
        }
      };
    // first we must have an array with all the posts  
    
    const getPosts = async () => {
        let query = {};
        let posts = await searchPostsReturnPosts(query);
        console.log("postlist", posts);
        let numPosts = posts.length;
        let postsData = [];
        console.log(Example1);


       

        if (numPosts > 0) {
          for (let i = 0; i < numPosts; i++) {

            
                // Replace 'T' with a space
            const stringWithoutT = posts[i].dateCreated.replace('T', ' ');

            // Remove the last 5 characters
            const simpleDate = stringWithoutT.slice(0, -5);

            let user = await searchUsersReturnUsers({userID: posts[i].userID})

            const postData = {
                id: i,
                text: posts[i].text,
                numLikes: posts[i].numLikes,
                date: simpleDate,
                postID: posts[i].postID,
                images: posts[i].photo,

                username: user[0].username,
                pfp: user[0].profilePicture
            };
            console.log("postdata", postData);
            postsData.push(postData);
          }
        }
        return postsData;
      };
    
      const [postsData, setPostsData] = useState([]);
    
      useEffect(() => {
        const fetchPosts = async () => {
          const data = await getPosts();
          setPostsData(data);
        };
    
        fetchPosts();
      }, []);


    return (
        <div>
        {postsData.map((postData) => (
            <PostCard key = {postData.id} postData={postData}/>
        ))}
        </div>
    );
}

export default PostList