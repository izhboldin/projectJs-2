const executeSvg = `<svg class="svg-execute" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
const editSvg = `<svg class="svg-edit" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
const removeSvg = `<svg class="svg-remove" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

const getData = (time) => {
    let el = ``;
    const hours = Math.ceil((time - Math.floor(Date.now() / 1000)) / 60 / 60);
    if (hours % 24 == 0) {
        el = `${hours / 24} д.`
    }
    else if (hours < 24) {
        el = `${hours % 24} ч.`
    }
    else {
        el = `${Math.ceil(hours / 24)} д. ${hours % 24} ч.`
    }
    if (hours <= 0) {
        return `<p class="d-inline text-danger">${el}</p>`
    }
    else {
        return `<p class="d-inline">${el}</p>`

    }
}

board.setAttribute("style", "height:calc(100vh - 56px)")
const boardColumnTopH = document.querySelector('.board-column-top').offsetHeight;
document.querySelectorAll('.board-column-element').forEach(el => el.setAttribute("style", `height:calc(100vh - ${boardColumnTopH + 70}px ); overflow-y: auto;`))
