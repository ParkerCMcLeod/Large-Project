import React, { useEffect } from 'react'
import PostCard from './PostCard'
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

    const numPosts = 10; // Set the number of posts you want to generate
    const postsData = [];
    
    // Generate i number of posts and add them to the postsData array
    for (let i = 1; i <= numPosts; i++) {
        // still need a datefield and num likes
        const postData = {

            id: i,
            text: i,
            numLikes: i,
            // if there is are no images this takes an empty array
            images: generateRandomImages()
        };
        postsData.push(postData);
    }

    console.log(postsData);


    return (
        <div>
        {postsData.map((postData) => (
            <PostCard key = {postData.id} postData={postData}/>
        ))}
        </div>
    );
}

export default PostList