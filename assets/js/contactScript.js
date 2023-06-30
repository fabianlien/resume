const API_KEY = "AIzaSyDGvBETzItQ1g8J1iPdIsmAi7coHG7_frM"

//** Renders map via google maps js API and adds home marker*/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {
            lat: 59.333333,
            lng: 18.012345,
        }
    });
    new google.maps.Marker({
        position: {
            lat: 59.34222271014225,
            lng: 17.93553904348374
        },
        map,
        title: "Home!",
    });
}

//* Post contact form data to emailJS api*/
function sendMail(contactForm) {
    emailjs.send("default_service", "template_default", {
        from_name: 'Fabian Lien',
        to_name: contactForm.name.value,
        reply_to: contactForm.emailaddress.value,
        message: contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
            contactForm.reset()
            document.getElementById("request-success").innerHTML = '<h5>Your project request has been sent!</h5><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            $("#request-success").removeClass("d-none");
            $(".close").on("click", () => {$("#request-success").addClass("d-none")})
        },
        function(error) {
            console.log("FAILER", error);
        }
    )
    return false;
}