// funkcje których jednak nie użyłem

// ale nie chce ich zupełnie wywalać

handleFetchErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

checkCodeOld = async () => {
    console.log("Checking the code..");
    console.log("code = ", this.code);
    if (this.code != "") {
        // console.log("code: " + this.code + " : " + typeof (this.code))
        console.log("fake api check..");
        await axios.get(this.apiFakePath + "/users/" + this.code)
            .then(function (response) {
                if (response.status == 200) { // KOD ISTNIEJE
                    //alert("Access granted, username: " + response.data.username);
                    // router.replace('/photos')
                    //router.push('/photos')
                    console.log("setting code: true")
                    codeIsValid = true
                    //this.setCodeIsValid(true);
                    console.log("code is valid inside = ", this.codeIsValid);
                    return true;
                }
            })
            .catch(function (error) {
                console.log("setting code: false")
                //this.setCodeIsValid(false);
                console.log("Error: " + error);
            });
    } else {
        //this.setCodeIsValid(false);
        //alert("Podaj kod [1-10]")
    }
    codeIsValid = false
    return false;
}

checkUserOld = () => {
    axios.get(this.apiCupidPath + "/user/" + this.username)
        .then(function (response) {
            if (response.status == 200) { // USER ISTNIEJE?
                alert("Access granted");

                let user = { username: this.username };

                axios.post(this.apiCupidPath + "/user/add", user)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
        .catch(function (error) {
            alert("Error: " + error);
        });
}

navigate = () => {
    if (this.codeIsValid && this.userIsValid) {
        // router.replace('/photos')
        router.push('/photos')
    } else {
        alert("Can't enter")
    }
}

show = () => {
    console.log("entering code = ", this.code)
    console.log("code is valid = ", this.codeIsValid)
    console.log("user is valid = ", this.userIsValid)
}

checkUserIsInAlbum = async (user, album) => {
    const listaUserow = album.userIDs
    const czyJest = listaUserow.includes(user.id)
    console.log("listaUserów w albumie \"", album.title, "\" : ", listaUserow, " nasze userID: ", user.id)
    return czyJest
}