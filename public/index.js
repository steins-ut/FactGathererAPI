let factType = document.getElementById("fact-type");
let queryInput = document.getElementById("query-input");
let textArea = document.getElementById("request-results");

let factCount = document.getElementById("fact-count");
fetch(window.location.href + "api/v0/fact/count").then((value) => {
    value.text().then((count) => { factCount.innerText = count; });
});
let fakectCount = document.getElementById("fakect-count");
fetch(window.location.href + "api/v0/fakect/count").then((value) => {
    value.text().then((count) => { fakectCount.innerText = count; });
});

async function onSendButtonClick() {
    let url = window.location.href + "api/v0/" + factType.value + "/" + queryInput.value;
    console.log(url);
    let res = await fetch(url);
    let resText = await res.text();
    textArea.textContent = resText;
}

let realBodyHTML = document.body.innerHTML;
let warningBodyHtml = `

<section class="hero is-primary is-fullheight has-gray-gradient">
    <div class="hero-body">
        <div class="container has-text-centered">
            <div class="box">
                <p>Please switch to a bigger screen for the optimal experience :)</p>
            </div>
        </div>
    </div>
</section>

`;

function portraitMobileMediaHandler(event) {
    document.body.innerHTML = event.matches ? warningBodyHtml : realBodyHTML;
    console.log(event.matches);
}

/*let portraitMobileMedia = window.matchMedia("screen and (orientation: portrait) and (max-width: 768px)");
console.log(portraitMobileMedia.media);
portraitMobileMedia.addEventListener("change", portraitMobileMediaHandler);
portraitMobileMediaHandler(portraitMobileMedia);*/