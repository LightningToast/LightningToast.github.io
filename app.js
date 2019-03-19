const titleTagline = document.getElementById("Title-Tagline");
const categoryAll = document.getElementById("Category-All");
const categoryApps = document.getElementById("Category-Apps");
const categoryARVR = document.getElementById("Category-ARVR");
const categoryHardware = document.getElementById("Category-Hardware");
const categoryAwards = document.getElementById("Category-Awards");

const projectStart = document.getElementById("Project-Date-Start");
const projectTitle = document.getElementById("Project-Title");
const projectMessage = document.getElementById("Project-Message");
const projectImage = document.getElementById("Project-Image-Source");
const projectEnd = document.getElementById("Project-Date-End");
// Disable scroll keys
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

var projectHeightOffset = 100;

var projectCategory = 0;
var locked = false;
var lockReset = true;
var projectTransitioning = false;
var projectPosition = 0;
const scrollThreshold = 300;
var scrollCount = 0;
var totalProjectsForCategory = 0;

//var tData = ProjectFile;
//var myJSON = '{"name":"John", "age":31, "city":"New York"}';
//var myObj = JSON.parse(ProjectFile);

var projectData;

main();

$(document).ready(function() {
  console.log("JQuery Loaded");
  console.log($("#Title-Outer").height());
  console.log($("#Project-Outer").height());

  $('body, html').animate({scrollTop: $("#Title-Outer").offset().top})
  locked = false;
  //document.getElementById("Project-View").addEventListener("wheel", scrollInput(e));
  window.addEventListener('wheel', function(e){
    processProjectScroll(e);
  });

  $.getJSON('ProjectFile.json', function(data) {
      projectData = data;
      totalProjectsForCategory = projectData.Projects.length;

      //console.log(projectData.Projects[0]);
      loadProjectData(0);
  });
})

function loadProjectData(num) {
  //console.log(num);
  if(num < 0) {
    return;
  }
  if(num >= projectData.Projects.length) {
    return;
  }
  var cur = projectData.Projects[num];

  projectStart.innerHTML = cur.Start;
  projectTitle.innerHTML = cur.Title;
  projectMessage.innerHTML = cur.Description;
  projectImage.src = cur.Image;
  projectEnd.innerHTML = cur.End;
}


function processProjectScroll(e) {
  //console.log($(document).scrollTop());
  if((!locked)&&(!lockReset)) {
    if(($(document).scrollTop()<=($("#Title-Outer").height()-(1*$("#Title-Outer").height())/3))||
    ($(document).scrollTop()>=($("#Title-Outer").height()+$("#Title-Outer").height()/16))) {
      console.log("lockReset");

      //console.log(($("#Title-Outer").height()-(3*$("#Title-Outer").height())/4))
      lockReset = true;
    }
  }
  if((!locked)&&(lockReset)) {
    //console.log($(document).scrollTop());

    if(($(document).scrollTop()>=($("#Title-Outer").height()-projectHeightOffset))&&
      ($(document).scrollTop()<=($("#Title-Outer").height()+$("#Title-Outer").height()/2))&&
    ($(document).scrollTop()>=($("#Title-Outer").height()-$("#Title-Outer").height()/2))) {
        //console.log("Position Reached");
        console.log("Locking")
        disableScroll();
        locked = true;
        lockReset = false;
        $('body, html').animate({scrollTop: $("#Project-Outer").offset().top})
    }
  } else if(locked) {
    //$('body, html').animate({scrollTop: $("#Project-Outer").offset().top})
    if(projectTransitioning) {
      return;
    }
    scrollCount += e.wheelDelta;
    //console.log(scrollCount);

    if((scrollCount < -scrollThreshold)&&(scrollCount < 0)) {
      if(projectPosition >= totalProjectsForCategory - 1) {
        locked = false;
        enableScroll();
        console.log("Unlocking")
      } else {
        projectPosition += 1;
        projectTransitioning = true;
        $("#Project-View").fadeTo(250, 0, function() {
          //console.log("Fade out");
          loadProjectData(projectPosition);
          $("#Project-View").fadeTo(250, 1, function() {
            //console.log("Fade in");
            projectTransitioning = false;
          });
        });

        //console.log(projectPosition);
      }
      scrollCount = 0;
    } else if((scrollCount > scrollThreshold)&&(scrollCount > 0)) {
      if(projectPosition <= 0) {
        locked = false;
        enableScroll();
        console.log("Unlocking")
      } else {
        projectPosition -= 1;
        projectTransitioning = true;
        $("#Project-View").fadeTo(250, 0, function() {
          //console.log("Fade out");
          loadProjectData(projectPosition);
          $("#Project-View").fadeTo(250, 1, function() {
            //console.log("Fade in");
            projectTransitioning = false;
          });
        });
        //console.log(projectPosition);
      }
      scrollCount = 0;
    }

  }

  //console.log(wDelta);
  //console.log($(document).scrollTop());
}

function main() {
  categoryAll.addEventListener('click', function() {
    disableScroll();
    projectCategory = 0;
    locked = true;
    lockReset = false;
    $('body, html').animate({scrollTop: $("#Project-Outer").offset().top})
  })
  categoryAll.addEventListener('mouseover', function() {
    titleTagline.innerHTML = "Creator"
  })

  categoryApps.addEventListener('click', function() {
    disableScroll();
    projectCategory = 1;
    locked = true;
    lockReset = false;
    $('body, html').animate({scrollTop: $("#Project-Outer").offset().top})
  })
  categoryApps.addEventListener('mouseover', function() {
    titleTagline.innerHTML = "App Developer"

  })

  categoryARVR.addEventListener('click', function() {
    disableScroll();
    projectCategory = 2;
    locked = true;
    lockReset = false;
    $('body, html').animate({scrollTop: $("#Project-Outer").offset().top})
  })
  categoryARVR.addEventListener('mouseover', function() {
    titleTagline.innerHTML = "AR/VR Futurist"

  })

  categoryHardware.addEventListener('click', function() {
    disableScroll();
    projectCategory = 3;
    locked = true;
    lockReset = false;
    $('body, html').animate({scrollTop: $("#Project-Outer").offset().top})
  })
  categoryHardware.addEventListener('mouseover', function() {
    titleTagline.innerHTML = "Hardware Tinkerer"
  })

  categoryAwards.addEventListener('click', function() {
    disableScroll();
    projectCategory = 4;
    locked = true;
    lockReset = false;
    $('body, html').animate({scrollTop: $("#Project-Outer").offset().top})
  })
  categoryAwards.addEventListener('mouseover', function() {
    titleTagline.innerHTML = "Award Winner"
  })
}

$(window).scroll(function() {
  //console.log($(window).scrollTop());
})


function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
