import getDaysInMonthFns from 'date-fns/getDaysInMonth';
import { MenuItem } from '@mui/material';

function useDateSelect() {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const months = [
        <MenuItem key={0} value={''}>None</MenuItem>,
        <MenuItem key={1} value={1}>1</MenuItem>,
        <MenuItem key={2} value={2}>2</MenuItem>,
        <MenuItem key={3} value={3}>3</MenuItem>,
        <MenuItem key={4} value={4}>4</MenuItem>,
        <MenuItem key={5} value={5}>5</MenuItem>,
        <MenuItem key={6} value={6}>6</MenuItem>,
        <MenuItem key={7} value={7}>7</MenuItem>,
        <MenuItem key={8} value={8}>8</MenuItem>,
        <MenuItem key={9} value={9}>9</MenuItem>,
        <MenuItem key={10} value={10}>10</MenuItem>,
        <MenuItem key={11} value={11}>11</MenuItem>,
        <MenuItem key={12} value={12}>12</MenuItem>
    ];

    function getDaysInMonth(month, year) {
        if (!month) {
            throw new Error('Month is required');
        } else if (month < 1 || month > 12) {
            throw new Error('Invalid month value');
        }
        if (month === 2) {
            return getDaysInMonthFns(new Date(year ? year : 1900, 1));
        }
        return daysInMonth[month - 1];
    }

    function getDaysInMonthMenuItems(month, year) {
        return [...Array(getDaysInMonth(month, year) + 1).keys()].map((el, i) => (
            <MenuItem key={i} value={i === 0 ? '' : i}>{i === 0 ? 'None' : i}</MenuItem>
        ))
    }

    function getMonthsMenuItems() {
        return months;
    }

    function getYearsMenuItems(startYear, interval) {
        return [...Array(interval + 2).keys()].map((el, i) => (
            <MenuItem key={i} value={i === 0 ? '' : i - 1 + startYear}>{i === 0 ? 'None' : i - 1 + startYear}</MenuItem>
        ))
    }

    return {
        getDaysInMonth,
        getDaysInMonthMenuItems,
        getMonthsMenuItems,
        getYearsMenuItems
    }
}

export default useDateSelect;