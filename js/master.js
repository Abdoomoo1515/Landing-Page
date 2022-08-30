//check if there is local storage color option
let maincolors = localStorage.getItem("color_option");

if (maincolors !== null) {
  document.documentElement.style.setProperty("--main--color", maincolors);

  //remove active class form all childrens
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    
    //add active class on element with data-color === local storage item
    if (element.dataset.color === maincolors) {
      element.classList.add("active");
    }

  });

}
//random background 
let backgroundOption = true;

//variable to control the background interval
let backgroundInterval;

//check if there is local storage background option
let localBackgroundsImgs = localStorage.getItem('background_option');

if(localBackgroundsImgs !== null){

  if (localBackgroundsImgs === "yes") {
    backgroundOption = true;
    
  } else {
    backgroundOption = false;
    
  }
  //remove all active classes 
    document.querySelectorAll(".random-backgrounds span").forEach((element) => {
      element.classList.remove("active");

      //add active class
      if (element.dataset.background === localBackgroundsImgs) {
        element.classList.add('active');
        }
    });
  
  
}

//check if there is local storage background option
let localBullets = localStorage.getItem("bullet_option");
if (localBullets !== null) {

  if (localBullets === "show") {
    document.querySelector(".nav-bullets").style.display = "block";
  } else {
    document.querySelector(".nav-bullets").style.display = "none";
  }

    //remove all active classes
    document.querySelectorAll(".bullet-option span").forEach((element) => {
      element.classList.remove("active");

      //add active class
      if (element.dataset.display === localBullets) {
        element.classList.add("active");
    }

  });
}


//toggle spin box
let gearbox = document.querySelector(".toggle-settings .fa-gear");

gearbox.onclick = function () {
  //to make the gear spin
  this.classList.toggle("fa-spin");
  //toggle settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

//==========================================================================================//
//==========================================================================================//
//switch colors option
const colorsli = document.querySelectorAll(".colors-list li");

//loop on all li's
colorsli.forEach((li) => {
  //click on every li
  li.addEventListener("click", (e) => {
    //set color root
    document.documentElement.style.setProperty("--main--color",e.target.dataset.color);

    //set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

   //FUNCTION to delete all active classes then add active class to the clicked one
    AddActiveClass(e);
  });
});



//switch random  backgrounds option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//loop on all spans

randomBackEl.forEach((span) => {
  //click on every span
  span.addEventListener("click", (e) => {
    //set background option on local storage
    localStorage.setItem("background_option", e.target.dataset.background);

    //FUNCTION to delete all active classes then add active class to the clicked one
    AddActiveClass(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  });
});
//==========================================================================================//
//==========================================================================================//

//select landing page element
let landingPage = document.querySelector(".landing-page");

//get array of images

let imgsArray = ["v1.jpg", "v2.jpg", "v3.jpg", "v4.jpg", "v5.jpg", "v6.jpg"];


//function to randomize imgs
function randomizeImgs(){
  
  if(backgroundOption === true){

    backgroundInterval = setInterval(() => {
      //get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //change background image url
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 5000);

    
  } 
}
randomizeImgs();


//selsect skills selector
let ourSkills = document.querySelector('.our-skills');

window.onscroll = function() {

  //skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  
  //skills outter height
  let skillsOutterHeight = ourSkills.offsetHeight;
  
  //window height
  let windowHeight = this.innerHeight;

  //window scrolltop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOutterHeight - windowHeight) {

    let allSkills = document.querySelectorAll('.skill-box .skill-progress span');
    allSkills.forEach(skills => {

      skills.style.width = skills.dataset.progress;

    });

  };
  
};

//create popup with the image
  let ourGallery = document.querySelectorAll(".our-gallery img");

  ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {
      //create overlay element
      let overlay = document.createElement("div");

      //add class to overlay
      overlay.className = "popup-overlay";

      //append overlay to the body
      document.body.appendChild(overlay);

      //create the popup
      let popupBox = document.createElement("div");

      //add class to popup
      popupBox.className = "popup-box";

      //check if there is alt text
      if (img.alt !== null) {
        //create image heading
        let imgHeading = document.createElement("h3");
        //create text for heading
        let imgText = document.createTextNode(img.alt);
        //append the text to the heading
        imgHeading.appendChild(imgText);
        //append the heading to popup box
        popupBox.appendChild(imgHeading);
      }else{
        document.querySelector(".popup-box h3").remove();
      }

      //create the img
      let popupImage = document.createElement("img");

      //set image source
      popupImage.src = img.src;

      //add image to popup box and set
      popupBox.appendChild(popupImage);

      //append popup to the body
      document.body.appendChild(popupBox);

      //to increase the width and height to make the trasition
      // setTimeout(() => {
      //   popupBox.style.width = "55%";
      //   popupBox.style.height = "60%";
      // });

      //create close span
      let closeButton = document.createElement("span");
      //create the close button text
      let closeText = document.createTextNode("x");
      //append closeText to closeButton
      closeButton.appendChild(closeText);
      //add class to closebutton
      closeButton.className = 'close-button';
      //append close button to popupbox
      popupBox.appendChild(closeButton);

      closeButton.addEventListener('click', (e) => {

        if (e.target.className === "close-button") {
          //remove the popupbox element
          e.target.parentNode.remove();
          //remove overlay
          document.querySelector(".popup-overlay").remove();
        } 
      });

    });
});
//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");

//select all links
const allLinks = document.querySelectorAll(".links a");

//function to scroll on click
function scrollToSection(elememts){

  elememts.forEach(element => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

};
//to scroll the nav links
scrollToSection(allLinks);
//to scroll the bullets
scrollToSection(allBullets);

//handel active classes
function AddActiveClass(ev){
  //remove all active classes
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //add class active on the tabed spans
  ev.target.classList.add("active");
};

//select bullet spans
let bulletSpans = document.querySelectorAll(".bullet-option span");

let navBullets = document.querySelector(".nav-bullets");

bulletSpans.forEach(span =>{

    span.addEventListener('click' , (e)=>{
      //set display on local storage
      localStorage.setItem("bullet_option", e.target.dataset.display);

      if (e.target.dataset.display === "show") {
      navBullets.style.display = "block";
      } else {
        navBullets.style.display = "none";
      }

      AddActiveClass(e);
    });
});

//reset button
document.querySelector(".reset-options").onclick = function(){
  //localStorage.clear(); clears every thing in local storage

  //remove items from local storage
  localStorage.removeItem("bullet_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");

  //reload page
  window.location.reload();
};
//toggle open class

let toggleBtn = document.querySelector(".links-container .toggle-menu");

let tLinks = document.querySelector(".links-container .links");


toggleBtn.onclick = function(e){
  //stop propagation
  e.stopPropagation();
  this.classList.toggle('menu-active');
  tLinks.classList.toggle('open');
};

//click anywhere outside the menu and toggle btn
document.addEventListener('click' , (e) => {

  if (e.target !== toggleBtn && e.target !== tLinks) {
      if (tLinks.classList.contains('open')) {
      
        toggleBtn.classList.toggle("menu-active");
        tLinks.classList.toggle("open");
      } 
    
    console.log("this is not the button or LIST");
  }

});
//stop propagation
tLinks.onclick = function(e){

  e.stopPropagation();
};