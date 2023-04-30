const qualities = {
    tedious: {
        _id: '67rdca3eeb7f6fgeed471198',
        name: 'Boring',
        color: 'primary'
    },
    strange: {
        _id: '67rdca3eeb7f6fgeed471100',
        name: 'Strange',
        color: 'secondary'
    },
    buller: {
        _id: '67rdca3eeb7f6fgeed4711012',
        name: 'Pranker',
        color: 'success'
    },
    alcoholic: {
        _id: '67rdca3eeb7f6fgeed471101',
        name: 'Alcoholic',
        color: 'danger'
    },
    handsome: {
        _id: '67rdca3eeb7f6fgeed471102',
        name: 'Handsome',
        color: 'info'
    },
    uncertain: {
        _id: '67rdca3eeb7f6fgeed471103',
        name: 'Uncertain',
        color: 'dark'
    }
}
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(qualities)
        }, 2000)
    })

export default {
    fetchAll
}
