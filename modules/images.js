'use strict';

var InsertImageModule = (function () {
    //insert html template
    let insertImageDD = document.createElement('div')
    insertImageDD.classList = "wysiwyg-dropdown wysiwyg-item";
    insertImageDD.setAttribute('id', 'insertImageDD');
    insertImageDD.innerHTML = `
                        <div class="wysiwyg-tooltip">
                            <i class="far fa-image"></i>
                            <span class="wysiwyg-tooltiptext">Insert&nbspimage</span>
                        </div>
                        <div class="wysiwyg-dropdown-content wysiwyg-dropdown-content2">
                            <div class="wysiwyg-switch">
                                <div class="wysiwyg-item-small wysiwyg-float-left wysiwyg-item-small-active" id="switch1">
                                    <i class="fas fa-xs fa-upload"></i>
                                </div>
                                <div class="wysiwyg-item-small wysiwyg-float-left" id="switch2">
                                    <i class="fas fa-xs fa-link"></i>
                                </div>
                            </div>
                            <div id="imgUrl" class="wysiwyg-invisible-imageUpload">
                                <input class="wysiwyg-input" placeholder="Url" name="imgUrl" />
                                <button class="wysiwyg-btn wysiwyg-button" id="insertImage">Insert</button>
                            </div>
                            <div id="imgUpload">
                                <input class="wysiwyg-input" type="file" name="imgUploadFile" hidden/>
                                <button class="wysiwyg-img-upload wysiwyg-float-left" id="clickUploaderBtn">Choose image</button>
                            </div>
                        </div>`;
    document.getElementsByClassName('wysiwyg-bar')[0].append(insertImageDD);


    //cache DOM
    let imgUrlInput = document.getElementsByName('imgUrl')[0];
    let imgUploadViaUrl = document.getElementById('imgUrl');
    let switch1 = document.getElementById('switch1');
    let switch2 = document.getElementById('switch2');
    let imgUploadFile = document.getElementsByName('imgUploadFile');
    let imgUpload = document.getElementById('imgUpload');
    let dropdownContent = insertImageDD.getElementsByClassName('wysiwyg-dropdown-content')[0];

    //add event listeners
    insertImageDD.addEventListener('click', toggleDropdown)
    dropdownContent.addEventListener('click', function (e) {
        e.stopPropagation()
    });



    //functions
    function toggleDropdown(event){
        insertImageDD.classList.toggle('wysiwyg-dropdown-active');
        event.stopPropagation();
    }

    function addScript(src, callback = null) {
        let script = document.createElement("script")
        script.type = "text/javascript";
        script.src = src;
        document.getElementsByTagName("head")[0].appendChild(script);
        script.onload = callback;
    }

    (function init() {
        //files uploaded via file upload are stored on firebase
        //these function handle this
        addScript('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js', function () { //add one script after another
            addScript('https://www.gstatic.com/firebasejs/5.0.0/firebase-storage.js', function () {
                addScript('https://www.gstatic.com/firebasejs/5.0.1/firebase.js', function () {
                    initializeFirebaseStorage(); //then initialize firebase
                });
            });
        });
        document.getElementById('clickUploaderBtn').addEventListener('click', function () {
            imgUploadFile[0].click()
        });
        imgUploadFile[0].addEventListener('change', function () {
            uploadToFirebase(imgUploadFile[0]);
        });
        //to handle file upload on your own change functions above

        document.getElementById('insertImage').addEventListener('click', insertImage);

        switch1.addEventListener('click', function () {
            toggleImgUploadSlot(switch1);
        });
        switch2.addEventListener('click', function () {
            toggleImgUploadSlot(switch2);
            insertEmptyImage();
        });
    })();

    function getImgBySrc(src) { //return img with given src
        let imgs = document.getElementsByTagName('img');
        for (let i of imgs)
            if (i.getAttribute('src') === src)
                return i;
    }

    function insertEmptyImage() {
        let empty = getImgBySrc('empty-image');
        if (empty !== undefined)
            return;
        document.execCommand('removeFormat', false, null);
        document.execCommand('insertImage', false, 'empty-image');
        document.execCommand('removeFormat', false, null);
    }

    function removeEmptyImages() {
        let emptyImage;
        while ((emptyImage = getImgBySrc('empty-image')) !== undefined) {
            emptyImage.remove();
        }
    }

    function insertImage() { //insert image from given url from input field
        if (imgUrlInput.value === '')
            return;

        getImgBySrc('empty-image').style = "width:200px";
        getImgBySrc('empty-image').setAttribute('src', imgUrlInput.value);

        document.execCommand('enableObjectResizing', false, null);
        insertImageDD.classList.remove('wysiwyg-dropdown-active');
    }

    function initializeFirebaseStorage() {
        //these are parameters of example firebase account
        var config = {
            apiKey: "AIzaSyDohEKd9u943emxFh5UieFkr0vMo0NVtNY",
            authDomain: "wysiwyg-editor.firebaseapp.com",
            databaseURL: "https://wysiwyg-editor.firebaseio.com",
            projectId: "wysiwyg-editor",
            storageBucket: "wysiwyg-editor.appspot.com",
            messagingSenderId: "1020398664581"
        };
        firebase.initializeApp(config);
    }

    function uploadToFirebase(fileInput) {
        if (fileInput.value === '')
            return;

        const ref = firebase.storage().ref();
        const file = fileInput.files[0]
        const name = (+new Date()) + '-' + file.name;
        const metadata = {
            contentType: file.type
        };
        const task = ref.child(name).put(file, metadata);
        task.then((snapshot) => {
            snapshot.ref.getDownloadURL().then(function (url) {
                document.getElementById('wysiwygInputArea').focus();
                document.execCommand('insertImage', false, url);
                let img = getImgBySrc(url) //get image that was inserted by execCommand
                if (img !== undefined)
                    img.style = "width:200px;";
            });
        }).catch((error) => {
            console.error(error);
        });

        insertImageDD.classList.remove('wysiwyg-dropdown-active');
    }

    function toggleImgUploadSlot(ref) { //switch between 'url' and 'file upload' slots
        if (ref.getAttribute('id') === 'switch1') {
            imgUploadViaUrl.classList.add('wysiwyg-invisible-imageUpload');
            imgUpload.classList.remove('wysiwyg-invisible-imageUpload')
            ref.classList.add('wysiwyg-item-small-active');
            switch2.classList.remove('wysiwyg-item-small-active');
        }
        if (ref.getAttribute('id') === 'switch2') {
            imgUpload.classList.add('wysiwyg-invisible-imageUpload');
            imgUploadViaUrl.classList.remove('wysiwyg-invisible-imageUpload')
            ref.classList.add('wysiwyg-item-small-active');
            switch1.classList.remove('wysiwyg-item-small-active');
        }
    }

    return {
        removeEmptyImages: removeEmptyImages,
        toggleImgUploadSlot: toggleImgUploadSlot
    }
})();
