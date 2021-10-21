const fs = require("fs");
const faker = require("faker");
const argv = require("yargs").argv;

const lines = argv.lines || 100000;
const filename = argv.output || "stylists.csv";
const stream = fs.createWriteStream(filename);

const createImages = () => {
  let images = [];
  while (images.length < 5) {
    images.push(faker.image.people(250, 250, true));
  }
  return images;
};

const createStylist = () => {
  const email = faker.internet.exampleEmail();
  const password = faker.internet.password();
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const instagram_url = "https://www.instagram.com/";
  const facebook_url = "https://www.facebook.com";
  const website_url = "https://www.website.com/";
  const images = createImages();
  const salon_name = faker.company.companyName();
  const phone_number = faker.phone.phoneNumberFormat();
  const street_address = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.state();
  const zipcode = faker.address.zipCodeByState(state);

  return `${email}|${password}|${first_name}|${last_name}|${instagram_url}|${facebook_url}|${website_url}|{${images}}|${salon_name}|${phone_number}|${street_address}|${city}|${state}|${zipcode}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let canWrite = true;
    do {
      i--;
      let post = createStylist();
      //check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        writeStream.write(post, encoding);
      }
      //else call write and continue looping
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      //our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once("drain", writing);
    }
  }
  writing();
};

//write our `header` line before we invoke the loop
stream.write(
  `email,password,first_name,last_name,instagram_url,facebook_url,website_url,images,salon_name,phone_number,street_address,city,state,zipcode\n`,
  "utf-8"
);
//invoke startWriting and pass callback
startWriting(stream, "utf-8", () => {
  stream.end();
});
