class MiraxAIProduct {
    constructor(appId, appKey, TypeID, ProductID, lat, lang, customerDetails,Logos) {
        this.appId = appId;
        this.appKey = appKey;
        this.TypeID = TypeID;
        this.ProductID = ProductID;
        this.Logos=Logos;
        this.lat = lat;
        this.lang = lang;
        this.launchurl = "";
        this.iframe = null;
        // this.url = "http://localhost:3000/";
        this.url = "https://product.hashlays.com/";
        this.customerDetails = customerDetails;
        if (TypeID == "1") {
            this.component = "jwellery";
        } else if (TypeID == "2") {
            this.component = "cosmatics";
        } else if (TypeID == "3") {
            this.component = "hands";
        } else if (TypeID == "4") {
            this.component = "faceais";
        }
    }

    receiveData(callback = null) {
        // Show loading indicator
        this.showLoadingIndicator();

        this.iframe = document.createElement("iframe");
        this.iframe.style.position = "fixed";
        this.iframe.style.inset = 0;
        this.iframe.width = "100%";
        this.iframe.height = "100%";
        this.iframe.style.border = "none";
        this.iframe.setAttribute("allow", "microphone; camera");
        document.body.appendChild(this.iframe);

        this.launchurl = `${this.url}/product/${this.component}?TypeId=${this.TypeID}&ProductId=${this.ProductID}&AppKey=${this.appKey}&AppId=${this.appId}&lat=${this.lat}&lang=${this.lang}&name=${this.customerDetails.name}&customerId=${this.customerDetails.customerId}&email=${this.customerDetails.email}&firstName=${this.customerDetails.firstName}&lastName=${this.customerDetails.lastName}&city=${this.customerDetails.city}&state=${this.customerDetails.state}&postalCode=${this.customerDetails.postalCode}&phoneNumber=${this.customerDetails.phonenumber}&country=${this.customerDetails.country}&AppLogo=${this.Logos.AppLogo}`;
        this.iframe.src = this.launchurl;

        this.iframe.onload = () => {
            // Remove loading indicator when iframe is fully loaded
            this.hideLoadingIndicator();
        };

        window.addEventListener("message", this.handleMessage.bind(this));
        this.sendMessageToIframe();
    }

    handleMessage(event) {
        if (event.origin !== this.url) return;
        const data = event.data;
        console.log("Data received from iframe:", data);
    }

    sendMessageToIframe() {
        if (!this.iframe || !this.iframe.contentWindow) {
            console.error("Iframe is not ready");
            return;
        }
        const message = {
            appId: this.appId,
            appKey: this.appKey,
            customerDetails: this.customerDetails
        };
        this.iframe.contentWindow.postMessage(message, this.url);
    }
   

    showLoadingIndicator() {
        const loadingDiv = document.createElement("div");
        loadingDiv.id = "loadingIndicator";
        loadingDiv.style.position = "absolute";
        loadingDiv.style.bottom = "0";
      
        loadingDiv.style.right = "0";
        loadingDiv.style.width = "100%";
        loadingDiv.style.height = "100%";
        loadingDiv.style.display = "flex";
        loadingDiv.style.flexDirection = "column";
        loadingDiv.style.alignItems = "center";
        loadingDiv.style.justifyContent = "center";
        loadingDiv.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
        loadingDiv.style.backdropFilter = "blur(5px)";
        loadingDiv.style.zIndex = "1000";

        // Create the image element with fade-in and fade-out animation
        const nameofLogo = document.createElement("img");
        nameofLogo.src = this.Logos.PreloadLogo; // Replace with your image URL
        nameofLogo.alt = "Logo";
        nameofLogo.style.marginTop = "5px"; // Add some space between the animation and the image
        nameofLogo.style.width = "250px"; // Adjust the width of the image as needed
        nameofLogo.style.height = "auto"; // Maintain the aspect ratio
        nameofLogo.style.animation = "fadeInOut 1.2s ease-in-out infinite"; // Apply the fade-in, fade-out animation
        
        // Add the image to the loading div
        loadingDiv.appendChild(nameofLogo);



       
        
        document.body.appendChild(loadingDiv);
       
    }
   

    hideLoadingIndicator() {
        const loadingDiv = document.getElementById("loadingIndicator");
        if (loadingDiv) {
            document.body.removeChild(loadingDiv);
        }
    }

      



}

// Add the keyframes for fade-in and fade-out animations
const style = document.createElement("style");
style.textContent = `
@keyframes fadeInOut {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}`;
document.head.appendChild(style);

function sendDataToMiraxAIProduct(appId, appKey, TypeID, ProductID, lat, lang, customerDetails,Logos, callback) {
    const miraxAIProduct = new MiraxAIProduct(appId, appKey, TypeID, ProductID, lat, lang, customerDetails,Logos);
     // Example usage:

    miraxAIProduct.receiveData(callback);
}




  

  

  
  
 
  

// Example of how to use the function
// sendDataToMiraxAIProduct("yourAppId", "yourAppKey", "4", "yourProductID", "yourLat", "yourLang", customerDetails, () => {
//     console.log("Data sent to MiraxAIProduct");
// });
