// =================================
// BULK URL OPENER SCRIPT
// =================================


const urlInput = document.getElementById("urlTextarea");

const openBtn = document.getElementById("openBtn");

const clearBtn = document.getElementById("clearBtn");


const totalUrls = document.getElementById("totalCount");

const validUrls = document.getElementById("validCount");

const openedUrls = document.getElementById("openedCount");




// GET URL LIST

function getUrls(){

    return [...new Set(

        urlInput.value
        .split("\n")
        .map(url => url.trim())
        .filter(url => url !== "")

    )];

}





// ADD HTTPS AUTOMATICALLY

function formatURL(url){

    if(
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ){

        url = "https://" + url;

    }


    return url;

}







// CHECK VALID URLS

function validURLList(){


    return getUrls()

    .map(formatURL)

    .filter(url=>{


        try{

            new URL(url);

            return true;

        }

        catch{

            return false;

        }


    });


}








// UPDATE COUNTERS

function updateStats(){


    let all = getUrls();

    let valid = validURLList();


    totalUrls.innerText = all.length;

    validUrls.innerText = valid.length;


}





urlInput.addEventListener(
"input",
updateStats
);



// OPEN ALL URLS

openBtn.addEventListener(
"click",
function(){


    let urls = validURLList();



    if(urls.length === 0){


        showMessage(
        "Please enter valid URLs"
        );


        return;


    }



    urls.forEach((url,index)=>{


        setTimeout(()=>{


            window.open(
                url,
                "_blank"
            );


        },index*300);



    });



    openedUrls.innerText = urls.length;



    showMessage(
    urls.length+" URLs opened"
    );



}

);









// RESET BUTTON

clearBtn.addEventListener(
"click",
function(){


    urlInput.value="";


    totalUrls.innerText="0";

    validUrls.innerText="0";

    openedUrls.innerText="0";



    showMessage(
    "Reset completed"
    );


}

);





// DOWNLOAD REPORT

function downloadReport(){


let urls = validURLList();


if(urls.length===0){

showMessage(
"No URLs found"
);

return;

}



let file = new Blob(

[
"Bulk URL Opener Report\n\n"+
urls.join("\n")
],

{
type:"text/plain"
}

);



let link=document.createElement("a");


link.href=URL.createObjectURL(file);


link.download="url-report.txt";


link.click();



}









// ADD DOWNLOAD BUTTON


const buttons = document.querySelector(".buttons");


if(buttons){


let downloadBtn=document.createElement("button");


downloadBtn.innerHTML="⬇ Download";


downloadBtn.className="download-btn";


buttons.appendChild(downloadBtn);



downloadBtn.onclick=downloadReport;


}









// TOAST MESSAGE

function showMessage(text){


let toast=document.createElement("div");


toast.className="toast";


toast.innerText=text;


document.body.appendChild(toast);



setTimeout(()=>{


toast.remove();


},2500);



}









// DEFAULT TEXT



updateStats();









// KEYBOARD SHORTCUTS


document.addEventListener(
"keydown",
function(event){



// CTRL + ENTER OPEN

if(event.ctrlKey && event.key==="Enter"){


event.preventDefault();


openBtn.click();


}






// CTRL + R RESET

if(event.ctrlKey && event.key.toLowerCase()==="r"){


event.preventDefault();


clearBtn.click();


}



}

);