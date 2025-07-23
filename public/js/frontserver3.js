
// Advertisement Section
let currentAdvId = null;
let advMode = "edit"; // Only edit supported in UI

function renderadvtable(advs) {
    const tbody = document.getElementById('table_body_adv');
    tbody.innerHTML = '';
    console.log(advs);
    advs.forEach(adv => {
        console.log(adv);

        const row = document.createElement('tr');
        row.setAttribute('align', 'center');
        row.innerHTML = `
            <td class="tdata"><img class="img-users rounded-circle" src="/public/images/${adv.Image.Contents}" alt="${adv.Image.Contents}"></td>
            <td class="tdata">${adv.Name}</td>
            <td class="tdata">${adv.Hits}</td>
            <td class="tdata">${adv.StartsOn.slice(0, 10)}</td>
            <td class="tdata">${adv.EndsOn.slice(0, 10)}</td>
            <td class="tdata">${adv.Adv_Status.Name}</td>
            <td class="tdata">
            <button type="button" class="btn bg-warning edit-adv" data-advid="${adv._id}" data-bs-toggle="modal" data-bs-target="#modalId"> <i class="fa fa-edit"></i> </button>
            <button type="button" class="btn bg-danger del-adv" data-advid="${adv._id}"> <i class="fa fa-trash"></i> </button>
            </td>
            `;
        tbody.appendChild(row);
    });
}

fetch('http://localhost:44000/adv/')
    .then(res => res.json())
    .then(advs => {
        renderadvtable(advs);
        editadv(advs);
        deladv();
        resetmodal();
    });

function editadv(advs) {
    const editBtns = document.querySelectorAll('.edit-adv');
    const Namemodal = document.getElementById("name-modal");
    const startmodal = document.getElementById("startson-modal");
    const endsmodal = document.getElementById("endson-modal");
    const hitsmodal = document.getElementById("hits-modal");
    const modalTitle = document.querySelectorAll("#modalTitleId");
    const eltStatus = document.getElementById("status-select");

    fetch("http://localhost:44000/adv_status/")
        .then(res => res.json())
        .then(status_all => {
            status_all.forEach(status => {
                console.log(status);
                eltStatus.innerHTML += `<option value="${status._id}">${status.Name}</option>`;
            });
        });

    editBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            advMode = "edit";
            currentAdvId = btn.getAttribute('data-advid');
            modalTitle.forEach(modal => {
                modal.innerHTML = "Edit Advertisement";
            });
            const selectedAdv = advs.find(a => a._id === currentAdvId);
            Namemodal.value = selectedAdv.Name;
            hitsmodal.value = selectedAdv.Hits;
            eltStatus.value = selectedAdv.Adv_Status._id;
            startmodal.value = selectedAdv.StartsOn.slice(0, 10);
            endsmodal.value = selectedAdv.EndsOn.slice(0, 10);
        });
    });
}

// Set the adv save button's onclick ONCE
const advModalSaveBtn = document.getElementById("modal-btn-save-adv");
advModalSaveBtn.onclick = function () {
    const Namemodal = document.getElementById("name-modal");
    const startmodal = document.getElementById("startson-modal");
    const endsmodal = document.getElementById("endson-modal");
    const hitsmodal = document.getElementById("hits-modal");
    const eltStatus = document.getElementById("status-select");

    if (advMode === "edit" && currentAdvId) {
        const UpdateAdv = {
            Name: Namemodal.value,
            Hits: hitsmodal.value,
            StartsOn: startmodal.value,
            EndsOn: endsmodal.value,
            Adv_Status: eltStatus.value
        };
        fetch(`http://localhost:44000/adv/${currentAdvId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UpdateAdv)
        })
            .then(res => res.json())
            .then(done => {
                location.reload();
            });
    }
};

function deladv() {
    fetch(`http://localhost:44000/adv/`)
        .then(res => res.json())
        .then(advs => {
            advs.forEach(adv => {
                console.log(adv);

                const expirydate = adv.EndsOn.slice(0, 10);
                const date = new Date();
                const okdate = date.toISOString().slice(0, 10);

                console.log(`${expirydate} \n ${okdate}`);

                if (expirydate === okdate) {
                    alert(`The Advertisement with ID ${adv._id} and Name ${adv.Name} is Expired and about to delete in 30 seconds automatically`);
                    setTimeout(() => {
                        fetch(`http://localhost:44000/adv/${adv._id}`, {
                            method: 'DELETE'
                        })
                            .then(res => res.json())
                            .then(done => {
                                alert("Deleted Successfully");
                                location.reload();
                            });
                    }, 30000);
                }
            });
        });




    const delBtns = document.querySelectorAll('.del-adv');
    delBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const advIDtodel = btn.getAttribute('data-advid');
            fetch(`http://localhost:44000/adv/${advIDtodel}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(done => {
                    location.reload();
                });
        });
    });
}

function resetmodal() {
    const btn = document.getElementById("modal-btn-close2");
    const form = document.querySelector(".modal-form");
    btn.onclick = function () {
        form.reset();
    };
}