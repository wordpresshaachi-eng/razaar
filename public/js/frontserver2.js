// require("dotenv").config();
document.addEventListener('DOMContentLoaded', function () {

    let currentCountryId = null;
    let countryMode = "add"; // "add" or "edit"

    function rendertable(countries) {
        const tbody = document.getElementById('table_body');
        tbody.innerHTML = '';
        countries.forEach(country => {
            const row = document.createElement('tr');
            row.setAttribute('align', 'center');
            row.innerHTML = `
            <td class="tdata ">${country.Name}</td>
            <td class="tdata">
            <button type="button" class="btn bg-warning edit-country" data-countryid="${country._id}" data-bs-toggle="modal" data-bs-target="#modalId2"> <i class="fa fa-edit"></i> </button>
            <button type="button" class="btn bg-danger del-country" data-countryid="${country._id}"> <i class="fa fa-trash"></i> </button>
            </td>
            `;
            tbody.appendChild(row);
        });
    }



    function addcountry() {
        const addBtn = document.querySelector('.addcountry-btn');
        const modalTitle = document.querySelectorAll("#modalTitleId2");
        const Namemodal = document.getElementById("name-modal2");
        addBtn.addEventListener('click', (e) => {
            countryMode = "add";
            modalTitle.forEach(modal => {
                modal.innerHTML = "Add Country";
            });
            Namemodal.value = "";
            currentCountryId = null;
        });

        const btn = document.getElementById("modal-btn-close2");
        btn.onclick = function () {
            location.reload();
        };
    }

    function editcountry(countries) {
        const editBtns = document.querySelectorAll('.edit-country');
        const Namemodal = document.getElementById("name-modal2");
        const modalTitle = document.querySelectorAll("#modalTitleId2");
        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                countryMode = "edit";
                currentCountryId = btn.getAttribute('data-countryid');
                modalTitle.forEach(modal => {
                    modal.innerHTML = "Edit Country";
                });
                const selectedCountry = countries.find(c => c._id === currentCountryId);
                Namemodal.value = selectedCountry.Name;
            });
        });

        const btn = document.getElementById("modal-btn-close2");
        btn.onclick = function () {
            location.reload();
        };
    }

    // Set the save button's onclick ONCE
    const modalSaveBtn = document.getElementById("modal-btn-save2");
    const Namemodal = document.getElementById("name-modal2");
    modalSaveBtn.onclick = function () {
        if (countryMode === "add") {
            const userName = Namemodal.value;
            const NewCountry = { Name: userName };
            fetch(`http://localhost:44000/country/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(NewCountry)
            })
                .then(res => res.json())
                .then(done => {
                    location.reload();
                });
        } else if (countryMode === "edit" && currentCountryId) {
            const updateCountry = { Name: Namemodal.value };
            fetch(`http://localhost:44000/country/${currentCountryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateCountry)
            })
                .then(res => res.json())
                .then(done => {
                    location.reload();
                });
        }
    };

    function delcountry() {
        const tbody = document.getElementById('table_body');
        // Attach the event listener ONCE
        tbody.addEventListener("click", function (e) {
            if (e.target.classList.contains('del-country')) {
                const countryIDtodel = e.target.getAttribute('data-countryid');
                fetch(`http://localhost:44000/country/${countryIDtodel}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(done => {
                        location.reload();
                    });
            }
        });
    }

    function resetmodal() {
        const btn = document.getElementById("modal-btn-close2");
        const form = document.querySelector(".modal-form");
        btn.onclick = function () {
            form.reset();
            location.reload();
        };
    }

    fetch('http://localhost:44000/country/')
        .then(res => res.json())
        .then(countries => {
            console.log(countries);
            rendertable(countries);
            editcountry(countries);
            addcountry();
            delcountry();
            resetmodal();
        });
});