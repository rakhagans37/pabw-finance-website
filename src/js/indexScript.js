function goToUpdatePage(name) {
    const url = new URL("updateBudgeting.html", window.location.href);
    url.searchParams.set("budgetName", name.toString());
    window.location.href = url.href;
}
