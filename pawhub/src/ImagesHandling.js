const fs = require('fs');

// Function to convert an image file object to a Base64 string
function imageToBase64String(imageFile) {
  try {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imageFile.path);

    // Encode the image buffer to Base64
    const base64String = imageBuffer.toString('base64');

    return base64String;
  } catch (err) {
    console.error('Error converting image to Base64:', err.message);
    return null;
  }
}

// Function to convert a Base64 string back to binary image data and save it to a file
function base64StringToImage(base64String, outputFile) {
  try {
    // Create a Buffer from the Base64 string
    const imageBuffer = Buffer.from(base64String, 'base64');

    // Write the buffer to a new image file
    fs.writeFileSync(outputFile.path, imageBuffer);

    console.log('Image successfully converted back from Base64 and saved!');
  } catch (err) {
    console.error('Error converting Base64 string to image:', err.message);
  }
}

// Example usage with file objects

// Assuming you have the image file object from the client's local upload
const imageFile = {
  path: 'src/images/Angery.PNG', // Replace this with the correct file object you have
  // You might have other properties like filename, mimetype, etc., depending on your setup
};

// Convert the image file to a Base64 string
const base64String = imageToBase64String(imageFile);

// Now, you can upload the base64String to your database using the update function where photo or profilePicture is set to base64String

// After retrieving the base64String from the database, to convert it back to an image and save it
// You need to provide a unique file name for the converted image, perhaps using postId or userId or any other identifier
const outputPath = 'src/images/AngeryCONVERTEDBACK.PNG'; // Replace this with the correct file object you want to save to
const outputFile = { path: outputPath }; // Create the file object for the output
base64StringToImage(base64String, outputFile);