// JavaScript for Home Page - Alumni Testimonial Section
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".testimonial-container");
    const testimonials = document.querySelectorAll(".testimonial");

    if (container && testimonials.length > 0) {
        const slideWidth = testimonials[0].offsetWidth + 15;
        let currentIndex = 0;

        // Clone the first testimonial to create an infinite loop effect
        const firstClone = testimonials[0].cloneNode(true);
        container.appendChild(firstClone);

        function showTestimonial() {
            currentIndex++;
            container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            container.style.transition = "transform 0.6s ease-in-out";

            if (currentIndex === testimonials.length) {
                setTimeout(() => {
                    container.style.transition = "none";
                    container.style.transform = `translateX(0px)`;
                    currentIndex = 0;
                }, 600);
            }
        }

        setInterval(showTestimonial, 4000);
    }
});

// jQuery for Course Listing & Course Pages
$(document).ready(function () {
    // Course Listing Page: Handle tab selection & filtering
    $(".filter-button").click(function () {
        $(".filter-button").removeClass("active");
        $(this).addClass("active");
        var category = $(this).data("filter");
        $("#course-search").val("");

        $(".course-item").hide().filter(function () {
            return category === "all" || $(this).data("category") === category;
        }).fadeIn();
    });

    // Search functionality - filters based on the selected category
    $("#course-search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        var category = $(".filter-button.active").data("filter");

        $(".course-item").each(function () {
            var matches = $(this).text().toLowerCase().includes(value);
            var inCategory = category === "all" || $(this).data("category") === category;
            $(this).toggle(matches && inCategory);
        });
    });

    // Course & Schedule Page: Handle menu tab switching
    $(".tab-button").click(function () {
        $(".tab-button").removeClass("active");
        $(".tab-content").removeClass("active");
        $(this).addClass("active");
        var target = $(this).data("target");
        $("#" + target).addClass("active");
    });

    // Course & Schedule Page: Handle toggle sections
    $(".toggle-content").hide();
    $(".toggle-title").click(function () {
        $(this).next(".toggle-content").slideToggle(300);
        $(this).find(".toggle-icon").text(function (_, text) {
            return text === "+" ? "−" : "+";
        });
    });
});

// Lead Registration Form Validation & Submission
document.getElementById("leadForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Validate Full Name
    const fullName = document.getElementById("full-name");
    if (!fullName.value.trim()) {
        document.getElementById("fullNameError").textContent = "Full Name is required.";
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById("phone");
    if (!phone.value.trim() || !/^\d{10}$/.test(phone.value.trim())) {
        document.getElementById("phoneError").textContent = "Please enter a 10-digit phone number without separators.";
        isValid = false;
    }

    // Validate Course Interest
    const courseInterest = document.getElementById("course-interest");
    if (!courseInterest.value) {
        document.getElementById("courseInterestError").textContent = "Please select a course.";
        isValid = false;
    }

    // Validate Learning Mode
    const learningMode = document.getElementById("learning-mode");
    if (!learningMode.value) {
        document.getElementById("learningModeError").textContent = "Please select a learning mode.";
        isValid = false;
    }

    // Validate Start Date
    const startDate = document.getElementById("start-date");
    if (!startDate.value) {
        document.getElementById("startDateError").textContent = "Please select a preferred start date.";
        isValid = false;
    }

    // Validate Referral Source
    const referSource = document.getElementById("refer-source");
    if (!referSource.value) {
        document.getElementById("referSourceError").textContent = "Please select how you heard about us.";
        isValid = false;
    }

    // Form submission with Ajax if valid
    if (isValid) {
        const formData = new FormData(this);
        fetch('URL', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'thank-you.html';
            } else {
                alert('Submission failed. Please try again!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again!');
        });
    }
});