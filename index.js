const data = [
    {
        "date": "10/01/2020",
        "amount": 100
    },
    {
        "date": "22/01/2020",
         "amount": -45
    }
];

const accountingEntryTemplate = (date, amount, totalBalance) => `
<tr>
    <td>
        ${date}
    </td>
    <td class=${amount >= 0 ? "text-success" : "text-danger"}>
        ${amount}
    </td>
    <td>
        ${totalBalance}
    </td>
</tr>
`;

const createAccountingEntry = (amount) => {
    let totalBalance = Number(document.getElementsByClassName("total-balance")[0].innerHTML);
    let accountingEntries = document.getElementsByClassName("accounting-entries")[0].innerHTML;

    const today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    totalBalance += amount;
    accountingEntries += accountingEntryTemplate(`${dd}/${mm}/${yyyy}`, amount, totalBalance);

    document.getElementsByClassName("total-balance")[0].innerHTML = totalBalance;
    document.getElementsByClassName("accounting-entries")[0].innerHTML = accountingEntries;
}

const onDeposit = () => {
    const amount = Number(document.getElementById("amount").value);
    createAccountingEntry(amount);
}

const onWithdrawal = () => {
    const amount = Number(document.getElementById("amount").value) * -1;
    createAccountingEntry(amount);
}

const onDocumentReady = () => {
    let totalBalance = Number(document.getElementsByClassName("total-balance")[0].innerHTML);
    let accountingEntries = document.getElementsByClassName("accounting-entries")[0].innerHTML;
    
    data.forEach(({ date, amount }) => {
        totalBalance += amount;
        accountingEntries += accountingEntryTemplate(date, amount, totalBalance);
    });
    
    document.getElementsByClassName("total-balance")[0].innerHTML = totalBalance;
    document.getElementsByClassName("accounting-entries")[0].innerHTML = accountingEntries;
}

const ready = (onDocumentReady) => {
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        onDocumentReady();
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    } else {
        document.attachEvent("onreadystatechange", () => {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                onDocumentReady();
            };
        });
    };
}

ready(onDocumentReady);
