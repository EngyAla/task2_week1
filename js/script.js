let carousel = document.querySelector(".carousel")
let container = document.querySelector(".container")
let firstImg = carousel.querySelectorAll("img")[0]
let arrowIcon = document.querySelectorAll(".container i")

let isDragStart = false, prevPageX, prevScrollLeft, timeoutId;
let firstImgWidth = firstImg.clientWidth + 19
const carouselChildrens = [...carousel.children]

let imgPerView = Math.round(carousel.offsetWidth / firstImgWidth)

carouselChildrens.slice(-imgPerView).reverse().forEach(img => {
    carousel.insertAdjacentElement("afterbegin", img.cloneNode(true));  // استخدام cloneNode لإنشاء نسخة من العنصر
});

// نسخ الصور الأولى وإضافتها في النهاية
carouselChildrens.slice(0, imgPerView).forEach(img => {
    carousel.insertAdjacentElement("beforeend", img.cloneNode(true));  // استخدام cloneNode لإنشاء نسخة من العنصر
});


let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // max scroll width


arrowIcon.forEach(icon =>{
    icon.addEventListener("click" ,() =>{
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth

        
    })
})
// console.log(prevPageX)


const dragStart = (e) =>{
    e.preventDefault();
    isDragStart = true
    prevPageX = e.pageX || e.touches[0].pageX ;
    prevScrollLeft = carousel.scrollLeft
    // console.log(prevScrollLeft)
}


const dragging =(e) =>{
    e.preventDefault();
    if(!isDragStart) return;
    // تحسب الفرق بين موضع الماوس الحالي وموضع الماوس عند بدء السحب. هذا الفرق يستخدم لتحديد مدى المسافة التي تم سحب الماوس فيها.
    let positionDiff = (e.pageX || e.touches[0].pageX ) - prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff
    // console.log(carousel.scrollLeft)
    // showHideIcons()
    // setTimeout(() => showHideIcons() , 60)
}


const dragStop = () =>{
    isDragStart = false
}



const autoplay = () =>{
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstImgWidth , 500)
}
autoplay();



const infiniteScroll = () =>{
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth)
        carousel.classList.remove("no-transition")

    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove("no-transition")
    }
    clearTimeout(timeoutId)
    if(!container.matches(":hover")) autoplay()
}
carousel.addEventListener("scroll" , infiniteScroll)



carousel.addEventListener("mousedown" , dragStart)
carousel.addEventListener("touchstart" , dragStart)



carousel.addEventListener("mousemove" , dragging)
carousel.addEventListener("touchmove" , dragging)



carousel.addEventListener("mouseup" , dragStop)
carousel.addEventListener("mouseleave" , dragStop)
carousel.addEventListener("touchend" , dragStop)


carousel.addEventListener("mouseleave" , autoplay)
carousel.addEventListener("mouseenter" , () => clearTimeout(timeoutId))

