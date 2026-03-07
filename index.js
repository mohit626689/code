let like = 0;
const likebutton = document.getElementById("likebutton");

// a function that increment the number of like
const addlike = (incrementby) => {
  like += incrementby;
  //show number of like on the button , like this (3) like@
  likebutton.innerText = ` (${like}) Like@`;
};

likebutton.addEventListener("click", () => {
  addlike(1);
  if (like === 5) {
    alert("win");
  }
});
