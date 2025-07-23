document.addEventListener("DOMContentLoaded", () => {

    function renderadmindata(admin) {
        const btnsave = document.getElementById("submitdata");
        const Emailform = document.getElementById("adminEmail");
        const Nameform = document.getElementById("name-txt");
        const passform = document.getElementById("adminPass");
        let eltSuccess = document.getElementById("success");

        Emailform.value = admin.Email;
        // Nameform.value = admin.Name;


        btnsave.addEventListener('click', () => {
            currentAdminId = admin.SuperAdminID;
            const newdata = {
                Email: Emailform.value,
                Password: passform.value
            }
            console.log(passform.value);


            fetch(`http://localhost:44000/user/${currentAdminId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newdata)
            })
                .then(res => res.json())
                .then(done => {
                    passform.value = "";

                    eltSuccess.setAttribute("class", "d-flex flex-column justify-content-center ");
                    setTimeout(() => {
                        eltSuccess.setAttribute("class", "d-none");
                    }, 3000);
                });

        });
    }

    fetch('http://localhost:44000/user/admin')
        .then(res => res.json())
        .then(admin => {
            console.log(admin);
            renderadmindata(admin);
        });


    // fetch('http://localhost:44000/user/', {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'Application/json' },
    //     body: JSON.stringify(newadmindata)
    // })
    //     .then(res => res.json())
    //     .then(done => {
    //         console.log(res);
    //     });
});