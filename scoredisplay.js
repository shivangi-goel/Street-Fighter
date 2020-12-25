var score=localStorage.getItem("myScore");
var fin_score=document.querySelector('.final_score');  
console.log("My Score in scoredisplay is "+score);
fin_score.textContent="Score-"+score;