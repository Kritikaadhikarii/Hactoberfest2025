// JSON data for fun facts
const funFacts = [
    {
        "title": "ENIAC's Size",
        "description": "The ENIAC, one of the earliest electronic general-purpose computers, weighed about 30 tons and occupied about 1,800 square feet."
    },
    {
        "title": "First Computer Mouse",
        "description": "The first computer mouse was made of wood in 1964 by Doug Engelbart."
    },
    {
        "title": "IBM's Gigabyte Milestone",
        "description": "IBM's first 1GB hard drive, released in 1980, weighed 550 pounds and cost $40,000."
    },
    {
        "title": "FORTRAN's Legacy",
        "description": "FORTRAN, created in 1957, is the oldest programming language still in use today."
    },
    {
        "title": "Origin of 'Bug'",
        "description": "The term 'bug' was used in engineering before Grace Hopper found a moth in the Harvard Mark II in 1947, which popularized the term in computing."
    },
    {
        "title": "Early Gaming History",
        "description": "Spacewar!, created in 1961, was one of the first influential computer games, though not technically the first computer game."
    },
    {
        "title": "The First Website",
        "description": "The first website ever created is still online: http://info.cern.ch/"
    },
    {
        "title": "Digital Currency",
        "description": "A significant portion of the world's currency exists only in digital form, though exact percentages vary."
    },
    {
        "title": "Google Searches",
        "description": "While specific numbers are not publicly shared, Google processes billions of searches daily, with many related to popular social media platforms."
    },
    {
        "title": "First Virus",
        "description": "The first computer virus, known as 'Creeper,' was detected on ARPANET, the predecessor of the internet, in the early 1970s."
    },
    {
        "title": "QWERTY Keyboard",
        "description": "The QWERTY keyboard layout was designed to prevent jamming in early typewriters by spacing out commonly used letter pairings."
    },
    {
        "title": "Moore's Law",
        "description": "Gordon Moore, co-founder of Intel, predicted that the number of transistors on a microchip would double approximately every two years, a trend that has held true for decades."
    },
    {
        "title": "First Webcam",
        "description": "The first webcam was used at the University of Cambridge to monitor a coffee pot, ensuring researchers didn't make a trip for an empty pot."
    },
    {
        "title": "ASCII Art",
        "description": "Before graphical interfaces, ASCII art was a popular way to create images using characters from the ASCII standard."
    },
    {
        "title": "CAPTCHA Origin",
        "description": "CAPTCHA, used to distinguish humans from bots online, stands for 'Completely Automated Public Turing test to tell Computers and Humans Apart.'"
    },
    {
        "title": "First Computer Programmer",
        "description": "Ada Lovelace is often credited as the first computer programmer for her work on Charles Babbage's early mechanical general-purpose computer, the Analytical Engine."
    },
    {
        "title": "Linux's Mascot",
        "description": "The Linux operating system's mascot is a penguin named Tux, chosen by creator Linus Torvalds."
    },
    {
        "title": "Email's Age",
        "description": "The first email was sent by Ray Tomlinson in 1971, who also introduced the use of the '@' symbol in email addresses."
    },
    {
        "title": "First Domain Name",
        "description": "The first domain name ever registered was Symbolics.com, on March 15, 1985."
    },
    {
        "title": "Unicode's Reach",
        "description": "Unicode, a computing industry standard for text representation, supports over 143,000 characters from 154 modern and historic scripts, as well as multiple symbol sets."
    }
];

// Function to generate a random fun fact
function generateRandomFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    const funFact = funFacts[randomIndex];
    return `<span class="fun-fact-title">${funFact.title}</span><br><span class="fun-fact-description">${funFact.description}</span>`;
}

// Event listener for button click
document.getElementById('generateFactButton').addEventListener('click', function () {
    const funFactDisplay = document.getElementById('funFactDisplay');
    funFactDisplay.innerHTML = generateRandomFunFact();
    // Smooth opacity change for display
    funFactDisplay.style.opacity = 0;
    setTimeout(() => { funFactDisplay.style.opacity = 1; }, 100);
});
