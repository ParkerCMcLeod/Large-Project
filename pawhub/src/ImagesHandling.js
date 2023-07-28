const fs = require('fs');

// Function to convert an image to a Base64 string
function imageToBase64String(imagePath) {
  try {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Encode the image buffer to Base64
    const base64String = imageBuffer.toString('base64');

    return base64String;
  } catch (err) {
    console.error('Error converting image to Base64:', err.message);
    return null;
  }
}

// Function to convert a Base64 string back to binary image data
function base64StringToImage(base64String, outputPath) {
  try {
    // Create a Buffer from the Base64 string
    const imageBuffer = Buffer.from(base64String, 'base64');

    // Write the buffer to a new image file
    fs.writeFileSync(outputPath, imageBuffer);

    console.log('Image successfully converted back from Base64!');
  } catch (err) {
    console.error('Error converting Base64 string to image:', err.message);
  }
}

// given a client's local image path, convert it to string
const imagePath = 'src\\images\\Angery.PNG';
const base64String = imageToBase64String(imagePath);

// upload it to database by using update function where photo or profilePicture is set to base64String

// pull from database and render by doing below:

// Assuming you want to convert it back to an image and save it
// needs to be unique file name that you save it to, maybe randomly gen string? Use postID? userID?
const outputPath = 'src\\images\\AngeryCONVERTEDBACK.PNG';
base64StringToImage(base64String, outputPath);