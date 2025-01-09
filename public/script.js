const blogDB = [
    {
        date: "25/11/2024",
        text: "This is my very first entry and can't wait to tell you all about me!\nPlease follow for my daily adventures!",
    },
    {
        date: "26/11/2024",
        text: "Wow, it's already the second input, we're flying here!\nToday was a great day and hopefully tomorrow will be even better!",
    },
    {
        date: "27/11/2024",
        text: "Another day another great story here, where you get your daily adventure fix from!\nToday I accomplished so much that I don't even know where to start!?",
    },
    {
        date: "28/11/2024",
        text: "Today is just annoying!\nI really need this thing to work now!",
    },
];
// temporary database above...

// async function retrieveBlog() {
//     try {
//       const response = await fetch("http://localhost:3000/blogs/");
//       const json = await response.json();
//       console.log(json);
//       return json;
//     } catch (error) {
//       console.error("not working", error);
//     }
//   }

// retrieveBlog();
// async function getAndDisplayNewBlog() {
//     const { blog } = await retrieveBlog();
//     displayBlog(blog);
// }

const blogDate = document.getElementById("blogDate");
const blogText = document.getElementById("blogText");

function displayBlog(index) {
    blogDate.textContent = blogDB[index].date;
    blogText.textContent = blogDB[index].text;
}    

// temp display solution
let index = 0;
displayBlog(index);
// ---

function displayHome() {
    index = 0;
    displayBlog(index);
}
function displayAbout() {
    index = 1;
    displayBlog(index);
}
function displayPrev() {
    --index;
    if (index < 0) { index = blogDB.length - 1; }
    displayBlog(index);
}
function displayNext() {
    ++index;
    if (index > blogDB.length - 1) { index = 0; }
    displayBlog(index);
}

const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", () => displayHome());
const aboutBtn = document.getElementById("aboutBtn");
aboutBtn.addEventListener("click", () => displayAbout());
const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", () => displayPrev());
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => displayNext());
