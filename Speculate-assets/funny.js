const body = document.getElementsByTagName('body')
window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === 'S' || event.key === 's')) {
        event.preventDefault()
        body[0].innerHTML =
          'nice try dickhead'
    }
    if (event.ctrlKey && event.key === 'C') {
        event.preventDefault()
        body[0].innerHTML =
            'nice try dickhead'
    }
    if (event.ctrlKey && (event.key === 'E' || event.key === 'e')) {
        event.preventDefault()
        body[0].innerHTML =
          'nice try dickhead'
    }
    if (
        event.ctrlKey &&
        (event.key === 'I' || event.key === 'i' || event.key === 'Ã„\xB1')
    ) {
        event.preventDefault()
        body[0].innerHTML =
          'nice try dickhead'
    }
    if (event.ctrlKey && (event.key === 'K' || event.key === 'k')) {
        event.preventDefault()
        body[0].innerHTML =
          'nice try dickhead'
    }
    if (event.ctrlKey && (event.key === 'U' || event.key === 'u')) {
        event.preventDefault()
        body[0].innerHTML =
          'nice try dickhead'
    }
})
document.addEventListener('contextmenu', function (e) {
    e.preventDefault()
})

