// blog.js
const articles = [
    {
        title: "Charlotte's Web",
        date: "July 5, 2022",
        ages: "10-14",
        genre: "Fantasy",
        stars: "****",
        description: "It tells the story of a livestock pig named Wilbur and his friendship with a barn spider named Charlotte.",
        imgSrc: "charweb.jpg", // Make sure this path is correct
        imgAlt: "Charlotte's Web Cover"
    },
	{
        title: "Magnus Chase Book One: Sword of Summer",
        date: "December 12, 2021",
        description: "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
        imgSrc: "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
        imgAlt: "Book cover for Magnus Chase 1",
        ages: "12-16",
        genre: "Fantasy",
        stars: "⭐⭐⭐⭐"
    },
    {
        title: "Belgariad Book One: Pawn of Prophecy",
        date: "Feb 12, 2022",
        description: "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
        imgAlt: "Book cover for Pawn of Prophecy",
        ages: "12-16",
        genre: "Fantasy",
        stars: "⭐⭐⭐⭐⭐"
    }
]

function createArticles() {
    const mainContent = document.getElementById('maincontent');
    const recommendedDiv = mainContent.querySelector('.recommended'); // Get the recommended div

    articles.forEach(article => {
        const articleElement = document.createElement('article');

        const articleHTML = `
            <section class="sort">
                <h2>${article.date}</h2>
                <h3>${article.ages}</h3>
                <p>${article.genre}</p>
                <p>${article.stars}</p>
            </section>
            <section class="book-details">
                <h2>${article.title}</h2>
                <h3>${article.genre}</h3> 
                <img src="${article.imgSrc}" alt="${article.imgAlt}">
                <p>${article.description}</p>
            </section>
        `;

        articleElement.innerHTML = articleHTML;
        mainContent.insertBefore(articleElement, recommendedDiv); // Insert before the recommended div
    });

    // Remove the original hardcoded article
    const originalArticle = mainContent.querySelector('article');
    if (originalArticle) {
        mainContent.removeChild(originalArticle);
    }
}

createArticles();