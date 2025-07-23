document.addEventListener('DOMContentLoaded', function () {

    let currentUserId = null;
    let userMode = "add"; // "add" or "edit"

    function rendertable(users) {
        const tbody = document.getElementById('table_body');
        tbody.innerHTML = '';

        users.sort((a, b) => {
            if (a.Role.Name === "Super Admin" && b.Role.Name !== "Super Admin") return -1;
            if (a.Role.Name !== "Super Admin" && b.Role.Name === "Super Admin") return 1;
            return 0;
        });

        if (!users) {
            alert("DB not connected or There are no Users Currently to Show");
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.setAttribute('align', 'center');
            row.innerHTML += `
            <td class="tdata"><img class="img-users rounded-circle" src="/public/images/${user.Image}" alt="${user.Image}"></td>
            <td class="tdata">${user.Name}</td>
            <td class="tdata">${user.BirthDate.slice(0, 10)}</td>
            <td class="tdata">+92${user.ContactNumber}</td>
            <td class="tdata">${user.Email}</td>
            <td class="tdata">${user.Role.Name}</td>
            <td class="tbtn tdata" data-useridforbtn="${user._id}">
            <button type="button" id="btnuser" class="btn bg-warning edit-user" data-userid="${user._id}" data-bs-toggle="modal" data-bs-target="#modalId"> <i class="fa fa-edit"></i> </button>
            <button type="button" id="btnuser" class="btn bg-danger del-user" data-userid="${user._id}"> <i class="fa fa-trash"></i> </button>
            </td>
            `;
            tbody.appendChild(row);

            if (user.Role.Name === "Super Admin") {
                const btns = document.querySelector(".tbtn");
                // console.log(btns.getAttribute('data-useridforbtn'));
                btns.innerHTML = "N/A";
            }
        });
    }
    fetch('http://localhost:44000/user/')
        .then(res => res.json())
        .then(users => {
            rendertable(users);
            edituser(users);
            adduser();
            deluser();
            resetmodal();

        });

    function adduser() {
        const addBtn = document.querySelector('.adduser-btn');
        const modalTitle = document.querySelectorAll("#modalTitleId");
        addBtn.addEventListener('click', () => {
            userMode = "add";
            modalTitle.forEach(modal => {
                modal.innerHTML = "Add User";
            });
            document.getElementById("email-modal").value = "";
            document.getElementById("name-modal").value = "";
            document.getElementById("dob-modal").value = "";
            document.getElementById("pass-modal").value = "";
            currentUserId = null;
        });
    }

    function edituser(users) {
        const editBtns = document.querySelectorAll('.edit-user');
        const Emailmodal = document.getElementById("email-modal");
        const Namemodal = document.getElementById("name-modal");
        const dobmodal = document.getElementById("dob-modal");
        const passmodal = document.getElementById("pass-modal");
        const modalTitle = document.querySelectorAll("#modalTitleId");
        editBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                userMode = "edit";
                currentUserId = btn.getAttribute('data-userid');
                modalTitle.forEach(modal => {
                    modal.innerHTML = "Edit User";
                });
                const selectedUser = users.find(u => u._id === currentUserId);
                Emailmodal.value = selectedUser.Email;
                Namemodal.value = selectedUser.Name;
                dobmodal.value = selectedUser.BirthDate.slice(0, 10);
                // passmodal.value = selectedUser.Password;
            });
        });
    }

    // Set the save button's onclick ONCE
    const modalSaveBtn = document.getElementById("modal-btn-save-user");
    modalSaveBtn.onclick = function () {
        const Emailmodal = document.getElementById("email-modal");
        const Namemodal = document.getElementById("name-modal");
        const dobmodal = document.getElementById("dob-modal");
        const passmodal = document.getElementById("pass-modal");
        if (userMode === "add") {
            const NewUser = {
                Name: Namemodal.value,
                Email: Emailmodal.value,
                Password: passmodal.value,
                BirthDate: dobmodal.value,
                ApiKey: "124",
                ContactNumber: 3214473212,
                Image: "/rehankhan74.jpg",
                LoginID: "6878a5db68c3d1e225b409ca",
                SecurityAnswer: "I am Fine",
                SecurityQuestion: "How are You?",
                Role: "6878a5db68c3d1e225b409cd"
            };
            fetch(`http://localhost:44000/user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(NewUser)
            })
                .then(res => res.json())
                .then(done => {
                    location.reload();
                });
        } else if (userMode === "edit" && currentUserId) {
            const UpdateUser = {
                Name: Namemodal.value,
                Email: Emailmodal.value,
                Password: passmodal.value,
                BirthDate: dobmodal.value
            };
            fetch(`http://localhost:44000/user/${currentUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(UpdateUser)
            })
                .then(res => res.json())
                .then(done => {
                    location.reload();
                });
        }
    };

    function deluser() {
        const delBtns = document.querySelectorAll('.del-user');
        delBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const userIDtodel = btn.getAttribute('data-userid');

                fetch(`http://localhost:44000/user/${userIDtodel}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(done => {
                        if (done.message === "Not Allowed") {
                            alert("Cannot Delete Super Admin/ Not Allowed");
                            setTimeout(() => {
                                location.reload();
                            }, 3000);
                        }
                        else
                            location.reload();
                    });
            });
        });
    }

    function resetmodal() {
        const btn = document.getElementById("modal-btn-close");
        const form = document.querySelector(".modal-form");
        btn.onclick = function () {
            form.reset();
        };
    }

});