let request = indexedDB.open("Camera", 1);
let db;

request.onupgradeneeded = (e) => {
    db = request.result;
    db.createObjectStore("gallery", { keyPath: "id" });
};

request.onsuccess = (e) => {
    db = request.result;
};

request.onerror = (e) => {
    alert(e.target.error);
};

function addMediaToGallery(data, type) {
    let tx = db.transaction("gallery", "readwrite");
    let gallery = tx.objectStore("gallery");
    let mediaData = {
        id: Date.now(),
        type,
        media: data,
    };
    gallery.add(mediaData);
}

function viewMedia() {
    let body = document.body;
    let tx = db.transaction("gallery", "readonly");
    let gallery = tx.objectStore("gallery");
    let req = gallery.openCursor();
    req.onsuccess = function () {
        let cursor = req.result;
        if (cursor) {
            if (cursor.value.type == "video") {
                let vidContainer = document.createElement("div");
                vidContainer.setAttribute("data-id", cursor.value.id);
                vidContainer.classList.add("gallery-vid-container");

                let video = document.createElement("video");
                video.controls = true;
                video.src = URL.createObjectURL(cursor.value.media);
                vidContainer.appendChild(video);

                let deletebtn = document.createElement("button");
                deletebtn.classList.add("gallery-delete-btn");
                deletebtn.innerText = "Delete";
                vidContainer.appendChild(deletebtn);

                let downloadBtn = document.createElement("button");
                downloadBtn.classList.add("gallery-download-btn");
                downloadBtn.innerText = "Download";
                vidContainer.appendChild(downloadBtn);

                body.appendChild(vidContainer);
            } else {
                let imgContainer = document.createElement("div");
                imgContainer.setAttribute("data-id", cursor.value.id);
                imgContainer.classList.add("gallery-img-container");

                let img = document.createElement("img");
                img.src = cursor.value.media;
                imgContainer.appendChild(img);

                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("gallery-delete-button");
                deleteBtn.innerText = "Delete";

                let downloadBtn = document.createElement("button");
                downloadBtn.classList.add("gallery-download-button");
                downloadBtn.innerText = "Download";

                imgContainer.appendChild(deleteBtn);
                imgContainer.appendChild(downloadBtn);
                body.appendChild(imgContainer);
            }
            cursor.continue();
        }
    };
}
