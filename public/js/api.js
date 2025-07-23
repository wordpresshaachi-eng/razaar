document.addEventListener('DOMContentLoaded', function () {


    const btn_login = document.getElementById("login-btn");
    if (btn_login) {
        btn_login.addEventListener("click", (e) => {
            login();
        });
    }

    function login() {

        //controls get
        eltEmail = document.getElementById("txtemail");
        eltPass = document.getElementById("txtpassword");

        let eltError = document.getElementById("error");
        let eltSuccess = document.getElementById("success");
        let eltSuccesstext = document.getElementById("textinner");

        //read and convert
        let email = eltEmail.value;
        let pasword = eltPass.value;



        const logindetail = {
            Email: email,
            Password: pasword
        };

        console.log(logindetail);

        fetch(`http://localhost:44000/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logindetail)
        })
            .then(res => res.json())
            .then(done => {
                if (done.message === "User not found" || done.message === "Password is incorrect") {
                    eltError.setAttribute("class", "d-block alert");
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
                else if (done.message === "Admin Logged In Successful") {
                    eltSuccesstext.innerText = "Welcome Admin, Login Success Redirecting";
                    eltSuccess.setAttribute("class", "d-block alert");
                    setTimeout(() => {
                        location.replace("/public/admin_main/index.html");
                    }, 3000);
                }
                else {
                    eltSuccess.setAttribute("class", "d-block alert");
                    setTimeout(() => {
                        location.replace("/public/index.html");
                    }, 3000);
                }
            });
    }

    const btn_signup = document.getElementById("signupbtn");
    if (btn_signup) {
        btn_signup.addEventListener("click", function (e) {
            e.preventDefault();
            signup();
            console.log("btn signup clicked");
        });
    } else {
        console.error('Signup button not found!');
    }
    function signup() {

        //controls get
        eltName = document.getElementById("txtname");
        eltEmail = document.getElementById("txtemail");
        eltPass = document.getElementById("txtpassword");
        eltDOB = document.getElementById("txtdob");

        let eltError = document.getElementById("error");
        let eltSuccess = document.getElementById("success");

        //read and convert
        let name = eltName.value;
        let email = eltEmail.value;
        let pasword = eltPass.value;
        let dob = eltDOB.value;

        if (name == "" || email == "" || pasword == "" || dob == "") {
            eltError.setAttribute("class", "d-block alert");
            setTimeout(() => {
                location.reload();
            }, 3000);
        }


        const signupdetail = {
            Email: email,
            Password: pasword,
            Name: name,
            BirthDate: dob,
            ApiKey: "124",
            ContactNumber: 3214473211,
            Image: "/rehankhan74.jpg",
            LoginID: "6878a5db68c3d1e225b409ca",
            SecurityAnswer: "I am Fine",
            SecurityQuestion: "How are You?",
            Role: "6878a5db68c3d1e225b409cd"
        };

        console.log(signupdetail);

        fetch(`http://localhost:44000/signup/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupdetail)
        })
            .then(res => res.json())
            .then(done => {

                eltSuccess.setAttribute("class", "d-block alert");
                setTimeout(() => {
                    location.replace("/public/login.html");
                }, 3000);

            });
    }

    const post_ad = document.getElementById("submit_btn");
    if (post_ad) {
        post_ad.addEventListener("click", (e) => {
            postAD();
        });
    }

    function postAD(city, cityarea, type, subcategory) {

        //controls get
        eltName = document.getElementById("name_adv");
        eltPrice = document.getElementById("price_adv");
        eltDesc = document.getElementById("desc_adv");
        eltCity = document.getElementById("city-select");
        eltCityArea = document.getElementById("cityarea-select");
        eltType = document.getElementById("type-select");
        eltCategory = document.getElementById("category-select");
        eltSubCategory = document.getElementById("subcategory-select");
        postadform = document.getElementById("postadform");

        let eltError = document.getElementById("error");
        let eltSuccess = document.getElementById("success");


        //read and convert
        let Name = eltName.value;
        let Price = eltPrice.value;
        let City = eltCity.value;
        let CityArea = eltCityArea.value;
        let Type = eltType.value;
        let Category = eltCategory.value;
        let SubCategory = eltSubCategory.value;
        let Desc = eltDesc.value;
        const now = new Date();
        const then = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const postdetail = {
            Name: Name,
            Price: Price,
            City: City,
            CityArea: CityArea,
            Adv_Status: "6878da113cb6a28408473027",
            Adv_Type: Type,
            Adv_SubCategory: SubCategory,
            Description: Desc,
            Hits: 0,
            StartsOn: now,
            Image: "6878dad83cb6a28408473038",
            User: "687df9cce153f5a525ca111a",
            EndsOn: then
        };

        console.log(postdetail);

        fetch(`http://localhost:44000/adv/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postdetail)
        })
            .then(res => res.json())
            .then(done => {
                if (done.message === 'not posted') {
                    eltError.setAttribute("class", "d-block alert");


                    setTimeout(() => {
                        //    location.reload();
                        eltError.setAttribute("class", "d-none alert");
                    }, 3000);
                }
                else {
                    eltSuccess.setAttribute("class", "d-block alert");
                    setTimeout(() => {
                        // location.replace("/public/index.html");
                        eltSuccess.setAttribute("class", "d-none alert");
                        postadform.reset();
                    }, 3000);
                }
            });
    }

    const fetchbtn = document.getElementById("fetch_btn");
    if (fetchbtn) {
        fetchbtn.addEventListener("click", (e) => {
            fetchADV_Data()
        });
    }

    async function fetchADV_Data() {
        const cityPromise = fetch("http://localhost:44000/city/").then(res => res.json());
        const cityAreaPromise = fetch("http://localhost:44000/cityarea/").then(res => res.json());
        const typePromise = fetch("http://localhost:44000/adv_type/").then(res => res.json());
        const subCategoryPromise = fetch("http://localhost:44000/adv_subcategory/").then(res => res.json());
        const alertBox = document.getElementById('custom-alert');

        const [city, cityarea, type, subcategory] = await Promise.all([
            cityPromise,
            cityAreaPromise,
            typePromise,
            subCategoryPromise
        ]);

        console.log(city, cityarea, type, subcategory);

        eltCity = document.getElementById("city-select");
        eltCityArea = document.getElementById("cityarea-select");
        eltType = document.getElementById("type-select");
        eltSubCategory = document.getElementById("subcategory-select");

        eltCity.innerHTML = '<option selected>Select one</option>';
        eltCityArea.innerHTML = '<option selected>Select one</option>';
        eltType.innerHTML = '<option selected>Select one</option>';
        eltSubCategory.innerHTML = '<option selected>Select one</option>';

        for (let i = 0; i < city.length; i++) {
            eltCity.innerHTML += `<option value="${city[i]._id}">${city[i].Name}</option>`;
        }

        for (let j = 0; j < cityarea.length; j++) {
            eltCityArea.innerHTML += `<option value="${cityarea[j]._id}">${cityarea[j].Name}</option>`;
        }

        for (let k = 0; k < type.length; k++) {
            eltType.innerHTML += `<option value="${type[k]._id}">${type[k].Name}</option>`;
        }

        for (let l = 0; l < subcategory.length; l++) {
            eltSubCategory.innerHTML += `<option value="${subcategory[l]._id}">${subcategory[l].Name}</option>`;
        }

        alertBox.innerHTML = 'Fetched all data Successfully';
        alertBox.classList.remove('d-none');
        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 3000);

    }

    async function fetchStatus_Data() {

    }
});