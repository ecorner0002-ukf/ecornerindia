const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const updateCounter = () => {

                const increment = target / 60;

                if(count < target){

                    count += increment;

                    if(target === 49){
                        counter.innerText =
                            (count/10).toFixed(1) + "★";
                    }
                    else{
                        counter.innerText =
                            Math.ceil(count) + "+";
                    }

                    requestAnimationFrame(updateCounter);
                }
                else{

                    if(target === 49){
                        counter.innerText = "4.9★";
                    }
                    else{
                        counter.innerText = target + "+";
                    }
                }
            };

            updateCounter();

            observer.unobserve(counter);
        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{
    observer.observe(counter);
});

// ===============================
// PREMIUM ENQUIRY POPUP
// ===============================

const enquiryPopup = document.getElementById("enquiryPopup");
const enquiryButtons = document.querySelectorAll(
    "#openEnquiryDesktop,\
    #openEnquiryMobile,\
    #openEnquiry,\
    #openRepairPopup,\
    #openDiagnosticPopup"
    );
const closePopup = document.getElementById("closePopup");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

const popupTitle = document.getElementById("popupTitle");
const popupChoices = document.getElementById("popupChoices");
const continueBtn = document.getElementById("continueWhatsapp");

const ownerNumber = "919941950591";

let enquiryType = "";
let selectedChoice = "";

const enquiryData = {

    product: {
        title: "Select Product Category",
        options: [
            "Mobility",
            "Laptop & PC",
            "Gaming",
            "TV & Audio",
            "Storage",
            "Camera",
            "Printer",
            "Smart Living",
            "Fragrance"
        ]
    },

    service: {
        title: "Select Your Device",
        options: [
            "Mobile",
            "Laptop",
            "Desktop",
            "Printer",
            "Camera",
            "Other"
        ]
    }

};

enquiryButtons.forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        enquiryPopup.classList.add("active");

        screen1.classList.add("active");
        screen2.classList.remove("active");

    });

});

if(closePopup){

    closePopup.addEventListener("click",function(){

        enquiryPopup.classList.remove("active");

    });

}

enquiryPopup.addEventListener("click",function(e){

    if(e.target===enquiryPopup){

        enquiryPopup.classList.remove("active");

    }

});

document.querySelectorAll(".popup-card").forEach(card=>{

    card.addEventListener("click",function(){

        enquiryType=this.dataset.type;

        if(enquiryType==="store"){

            const msg=`Hi e-Corner!

I would like to visit your store.

Could you please share your branch details and timings?`;

            window.open(
                `https://wa.me/${ownerNumber}?text=${encodeURIComponent(msg)}`,
                "_blank"
            );

            return;

        }

        screen1.classList.remove("active");
        screen2.classList.add("active");

        popupTitle.textContent=enquiryData[enquiryType].title;

        popupChoices.innerHTML="";

        selectedChoice="";

        enquiryData[enquiryType].options.forEach(item=>{

            const btn=document.createElement("button");

            btn.className="choice-btn";

            btn.textContent=item;

            btn.onclick=function(){

                document.querySelectorAll(".choice-btn").forEach(b=>b.classList.remove("active"));

                this.classList.add("active");

                selectedChoice=item;

            }

            popupChoices.appendChild(btn);

        });

    });

});

continueBtn.addEventListener("click",function(){

    if(selectedChoice===""){

        alert("Please select an option.");

        return;

    }

    let message="";

    if(enquiryType==="product"){

        message=
`Hi e-Corner!

I am interested in purchasing a product.

Category: ${selectedChoice}

Please guide me with the available options.`;

    }

    else{

        message=
`Hi e-Corner!

I need a repair/service.

Device: ${selectedChoice}

Please guide me with the next steps.`;

    }

    window.open(

        `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`,

        "_blank"

    );

});