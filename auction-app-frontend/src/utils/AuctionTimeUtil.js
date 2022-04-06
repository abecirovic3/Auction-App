function getAuctionTimeLeftMessage(jsonEndDate) {
    const endDate = new Date(jsonEndDate);
    const currentDate = new Date();

    if (currentDate > endDate) {
        return 'Auction ended';
    }

    const endDateMillis = Date.parse(endDate.toString());
    const currentDateMillis = Date.parse(currentDate.toString())
    const millisBetween = endDateMillis - currentDateMillis;

    const daysBetween = Math.floor((millisBetween) / 86400000);
    const weeks = Math.floor(daysBetween / 7);
    const days = daysBetween % 7;

    if (weeks === 0 && days === 0) {
        const minutesBetween = Math.floor((endDateMillis - currentDateMillis) / 60000);
        const hours = Math.floor(minutesBetween / 60);
        const minutes = minutesBetween % 60;
        if (hours === 0 && minutes === 0) {
            return 'Less than a minute';
        }

        if (hours === 0) {
            return getMessageFormat(minutes, 'Minute');
        }

        if (minutes === 0) {
            return getMessageFormat(hours, 'Hour');
        }

        return getMessageFormat(hours, 'Hour') + ' ' + getMessageFormat(minutes, 'Minute');
    }

    if (weeks === 0) {
        return getMessageFormat(days, 'Day');
    }

    if (days === 0) {
        return getMessageFormat(weeks, 'Week');
    }

    return getMessageFormat(weeks, 'Week') + ' ' + getMessageFormat(days, 'Day');
}

function getMessageFormat(value, unit) {
    return value + ' ' + unit + (value === 1 ? '' : 's');
}

function auctionEnded(jsonEndDate) {
    const endDate = new Date(jsonEndDate);
    const currentDate = new Date();

    return currentDate > endDate;
}

const AuctionTimeUtil = {
    getAuctionTimeLeftMessage,
    auctionEnded
};

export default AuctionTimeUtil;