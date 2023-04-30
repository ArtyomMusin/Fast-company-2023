function timeDifference(previous) {
    const current = Date.now()
    const elapsed = current - previous

    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365

    const getMessage = (type, value) => {
        const lastSymbol = value % 10
        let unit = ''
        switch (type) {
            case 'year':
                if (lastSymbol === 1) unit = 'год'
                if (lastSymbol > 1 && lastSymbol < 5) unit = 'годa'
                if (!unit) unit = 'лет'
                break
            case 'month':
                if (lastSymbol === 1) unit = 'месяц'
                if (lastSymbol > 1 && lastSymbol < 5) unit = 'месяца'
                if (!unit) unit = 'месяцев'
                break
            case 'week':
                if (lastSymbol === 1) unit = 'неделя'
                if (lastSymbol > 1 && lastSymbol < 5) unit = 'недели'
                if (!unit) unit = 'недель'
                break
            case 'day':
                if (lastSymbol === 1) unit = 'день'
                if (lastSymbol > 1 && lastSymbol < 5) unit = 'дня'
                if (!unit) unit = 'дней'
                break
            case 'hour':
                if (lastSymbol === 1) unit = 'час'
                if (lastSymbol > 1 && lastSymbol < 5) unit = 'часа'
                if (!unit) unit = 'часов'
                break
            case 'minute':
                if (lastSymbol === 1) unit = 'минута'
                if (lastSymbol > 1 && lastSymbol < 5) unit = 'минуты'
                if (!unit) unit = 'минут'
                break
            case 'second':
                if (lastSymbol === 1) unit = 'секунда'
                if (lastSymbol > 1 && lastSymbol < 5) unit = 'секунды'
                if (!unit) unit = 'секунд'
                break
        }
        return `${value} ${unit} назад`
    }

    if (elapsed < msPerMinute) {
        return getMessage('second', Math.round(elapsed / 1000))
    }

    if (elapsed < msPerHour) {
        return getMessage('minute', Math.round(elapsed / msPerMinute))
    }

    if (elapsed < msPerDay) {
        return getMessage('hour', Math.round(elapsed / msPerHour))
    }

    if (elapsed < msPerMonth) {
        return getMessage('day', Math.round(elapsed / msPerDay))
    }

    if (elapsed < msPerYear) {
        return getMessage('month', Math.round(elapsed / msPerMonth))
    }

    return getMessage('year', Math.round(elapsed / msPerYear))
}

export default timeDifference
