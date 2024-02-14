const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

        .to(".boundingelem", {
            y: '0',
            duration: 2,
            // opacity:0,
            delay: -1,
            stagger: .2,    //kind of delay
            ease: Expo.easeInOut
        })

        .from("#herofooter", {
            y: '-10',
            opacity:0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}


/* jab mouse move ho to hum log skew kar paaye aur maximum skew 
and minimum skew define kar paaye, jab mouse move ho to chapta(skew) 
ki value badhe, aur jab mouse chalna band ho jaaye to chapta(skew)
hata lo  */

var timeout;

function circleChaptaKaro() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout);

        var xdiff = dets.clientX - xprev;           // dets.clientX = new location in x axis
        var ydiff = dets.clientY - yprev; 

        xscale = gsap.utils.clamp(0.8,1.2, xdiff);
        yscale = gsap.utils.clamp(0.8,1.2, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        // console.log(xdiff, ydiff);
        
        // console.log(gsap.utils.clamp(0.8,1.2, xdiff), gsap.utils.clamp(0.8,1.2, ydiff));

                            //in console type gsap.utils.clamp(0.8,1.2,1.1);    
                            //gsap.utils.clamp(min value of range, max value of range, value to clamp); 
                            //or search clamp method in gsap utils methods

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
        /* mouse stop thayu tyare aa setTimeout valu function call thase(scale(1,1) thase) and jo mouse just stop karine 
        pachhu chalavta rahya to e just stop karyu tyar no timeout clear thai jase(clearTimeout(timeout);) */

    })
}
circleChaptaKaro();


function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        // console.log(dets.clientX, dets.clientY);
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
circleMouseFollower();
firstPageAnim();




// second section (after hero section)

/* teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, 
jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai
mouse ki x and y position pata karo, ab mouse ki x y position ke badle us 
image ko show karo and us image ko move karo, move karte waqt rotate karo, 
and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye */

document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function(dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;    //dets.clientX = current position of mouse  &  rotate = previous position of mouse
                                            //dets.clientX = 205 & rotate = 200  so, diffrot = 5  therefor img 5 degree rotate karse
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,      //pehla power1 lakhyu hatu ; vadhare smooth karva power3 lakhyu
            top: diff,         //img top(.elem na top thi) thi etli j niche aavse jetlo diff hase
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });


    elem.addEventListener("mouseleave", function(dets) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,     
            duration: 0.5,
        });
    });


});

