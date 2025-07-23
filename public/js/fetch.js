document.addEventListener("DOMContentLoaded", () => {

    function renderalldata(realusers, advCount, i) {
        const users = document.getElementById("usertxt");
        const activeusers = document.getElementById("activeuserstxt");
        const ads = document.getElementById("adstxt");
        const pendingads = document.getElementById("pendingads");

        users.innerText = realusers;
        activeusers.innerText = realusers;
        ads.innerText = advCount;
        pendingads.innerText = i;
        // You can set pendingads.innerText if you want
    }

    // Fetch users and ads, then call renderalldata
    Promise.all([
        fetch('http://localhost:44000/user/').then(res => res.json()),
        fetch('http://localhost:44000/adv/').then(res => res.json())
    ]).then(([users, advs]) => {
        let realusers = users.filter(u => u.Role.Name !== "Super Admin").length;
        let advCount = advs.length;
        let i = 0;

        advs.forEach(adv => {
            console.log(adv);
            if (adv.Adv_Status.Name === "Draft") {
                i++;
            }
            else
                i;
        });

        renderalldata(realusers, advCount, i);
    });

});