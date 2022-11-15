export function setRootWrapperPadding(isHomepage) {
    const elements = Array.from(document.querySelectorAll(".standardPadding"));
    if (isHomepage) {
        elements.forEach(element => {
            element.style.marginLeft = "70px";
            element.style.marginRight = "70px";
        })
    } else {
        elements.forEach(element => {
            element.style.marginLeft = "384px";
            element.style.marginRight = "400px";
        })
    }
}
